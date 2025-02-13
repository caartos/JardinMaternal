import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { updateUser } from "../actions/userActions";
import { updateProfile } from "../config/auth";
import useNavigate from "../utils/navigation";
import { format } from "date-fns";

const useCreateChild = (loggedUser) => {
  const dispatch = useDispatch();
  const navigateToScreen = useNavigate();

  const createChild = async (child) => {
    // Verificar que todos los campos estén completos
    if (!child.nombre || !child.apellido || !child.nacionalidad || !child.dni || !child.childImage || !child.fechaDeNacimiento) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    // Si tiene hijos, verificar si ya existe un hijo con el mismo nombre y DNI
    const hijoExistente = (loggedUser.hijos || []).find(
      (hijo) => hijo.nombre.trim().toLowerCase() === child.nombre.trim().toLowerCase() || hijo.dni.trim() === child.dni.trim()
    );

    if (hijoExistente) {
      // Si ya existe un hijo con el mismo nombre y DNI, mostrar una alerta
      Alert.alert("Error", "Ya existe un hijo/a con estos datos.");
      return;
    }

    const formattedDate = format(child.fechaDeNacimiento, "yyyy-MM-dd");

    const updatedUser = {
      ...loggedUser,
      hijos: [...(loggedUser.hijos || []), {...child, fechaDeNacimiento: formattedDate}],
    };

    try {
      // Actualizar el usuario en Firebase
      const updatedUserChild = await updateProfile(loggedUser, updatedUser);
      // Actualizar el estado en Redux
      dispatch(updateUser(updatedUserChild));
      Alert.alert("Éxito", "Hijo/a agregado/a exitosamente.");
      navigateToScreen("LoggedMenu");
    } catch (error) {
      console.error("Error actualizando el usuario en Firebase: ", error);
      Alert.alert("Error", "Hubo un problema al actualizar el usuario. Por favor, intenta nuevamente.");
    }
  };

  return { createChild };
};

export default useCreateChild;