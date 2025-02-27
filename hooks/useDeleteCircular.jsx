import { useState } from "react";
import { deleteCircular } from "../config/db/circular/createCircular";
import { Alert } from "react-native";

const useDeleteCircular = () => {
  const [error, setError] = useState(null);

  const handleDeleteCircular = async (id, setCirculars) => {
    try {
      await deleteCircular(id);
      setCirculars((prevCirculars) =>
        prevCirculars.filter((circular) => circular.id !== id)
      );
      Alert.alert("Éxito", "Circular eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar la circular:", error);
      setError(error);
      Alert.alert("Error", "Hubo un problema al eliminar la circular.");
    }
  };

  return { handleDeleteCircular, error };
};

export default useDeleteCircular;
