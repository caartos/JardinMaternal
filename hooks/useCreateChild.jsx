import { Alert } from "react-native";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import useNavigate from "../utils/navigation";
import { format } from "date-fns";
import { createChildInDB } from "../config/db/child/child";
import { useDispatch } from "react-redux";
import { addChild } from "../actions/childActions";

const useCreateChild = (userId) => {
  const navigateToScreen = useNavigate();
  const dispatch = useDispatch();

  const createChild = async (child) => {
    // Verificar que todos los campos estén completos
    if (
      !child.nombre ||
      !child.apellido ||
      !child.nacionalidad ||
      !child.dni ||
      !child.profileImage ||
      !child.fechaDeNacimiento
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const formattedDate = format(child.fechaDeNacimiento, "yyyy-MM-dd");

    let imageUrl = child.profileImage;

    // Subir imagen si es nueva
    if (child.profileImage && !child.profileImage.startsWith("https://")) {
      try {
        const response = await fetch(child.profileImage);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, `childImages/${child.dni}`);

        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        Alert.alert(
          "Error",
          "Hubo un problema al subir la imagen. Por favor, intenta nuevamente."
        );
        return;
      }
    }

    const childData = {
      ...child,
      fechaDeNacimiento: formattedDate,
      profileImage: imageUrl,
      roomId: "",
      parentId: userId,
      parentId2: child.parentId2 || null,
    };

    try {
      // Agregar el niño a la base de datos
      const childWithId = await createChildInDB(childData);
      dispatch(addChild(childWithId));
      Alert.alert("Éxito", "Hijo/a agregado/a exitosamente.");
      navigateToScreen("LoggedMenu");
    } catch (error) {
      console.error("Error al agregar el niño en Firebase: ", error);
      Alert.alert(
        "Error",
        "Hubo un problema al agregar el niño. Por favor, intenta nuevamente."
      );
    }
  };

  return { createChild };
};

export default useCreateChild;
