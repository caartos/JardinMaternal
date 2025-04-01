import { useState } from "react";
import { Alert } from "react-native";
import { deleteTeacher } from "../config/db/users/users";


const useDeleteTeacher = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (teacherId) => {
    setIsDeleting(true);
    setError(null);

    try {
      // Llama a la función para eliminar al maestro
      await deleteTeacher(teacherId);
      Alert.alert("Éxito", "El maestro ha sido eliminado exitosamente.");
      console.log(`Maestro con ID ${teacherId} eliminado exitosamente.`);
    } catch (err) {
      console.error("Error al eliminar el maestro:", err);
      setError(err);
      Alert.alert("Error", "No se pudo eliminar el maestro. Inténtalo nuevamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteUser, isDeleting, error };
};

export default useDeleteTeacher;