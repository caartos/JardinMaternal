import { useState } from "react";
import { updateCircular } from "../config/db/circular/createCircular";
import { Alert } from "react-native";

const useUpdateCircular = () => {
  const [error, setError] = useState(null);

  const handleSaveCircular = async (
    editingCircular,
    setCirculars,
    setEditingCircular
  ) => {
    try {
      await updateCircular(editingCircular.id, {
        titulo: editingCircular.titulo,
        circular: editingCircular.circular,
      });
      setCirculars((prevCirculars) =>
        prevCirculars.map((circular) =>
          circular.id === editingCircular.id ? editingCircular : circular
        )
      );
      setEditingCircular(null);
      Alert.alert("Éxito", "Circular editada exitosamente.");
    } catch (error) {
      console.error("Error al editar la circular:", error);
      setError(error);
      Alert.alert("Error", "Hubo un problema al editar la circular.");
    }
  };

  return { handleSaveCircular, error };
};

export default useUpdateCircular;
