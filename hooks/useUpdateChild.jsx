import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { updateChildInDB } from "../config/db/child/child";
import useNavigate from "../utils/navigation";
import { updateChild } from "../actions/childActions";

const useUpdateChild = () => {
  const dispatch = useDispatch();
  const navigateToScreen = useNavigate();

  const handleUpdateChild = async (childId, updatedChild) => {
    try {
      // Actualizar el niño en la base de datos
      await updateChildInDB(childId, updatedChild);
      // Despachar la acción para actualizar el niño en el estado global de Redux
      dispatch(updateChild({ id: childId, ...updatedChild }));
      navigateToScreen("ChildMenu");

      Alert.alert("Éxito", "Hijo/a actualizado/a exitosamente.");
    } catch (error) {
      console.error("Error al actualizar el niño en Firebase: ", error);
      Alert.alert(
        "Error",
        "Hubo un problema al actualizar el niño. Por favor, intenta nuevamente."
      );
    }
  };

  return { handleUpdateChild };
};

export default useUpdateChild;
