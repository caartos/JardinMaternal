import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { getChildObservations, saveChildObservations } from "../config/db/child/child";
import useNavigate from "../utils/navigation";

const useChildObservations = (childId, initialObservations = {}) => {
  const navigateToScreen = useNavigate()
  const [observaciones, setObservaciones] = useState({
    siesta: initialObservations.siesta || "",
    baño: initialObservations.baño || "",
    merienda: initialObservations.merienda || "",
    comentarios: initialObservations.comentarios || "",
  });

  // Obtener observaciones al cargar el componente
  useEffect(() => {
    const fetchObservaciones = async () => {
      try {
        const data = await getChildObservations(childId);
        setObservaciones(data);
      } catch (error) {
        console.error("Error al obtener las observaciones:", error);
        Alert.alert("Error", "Hubo un problema al obtener las observaciones.");
      }
    };

    fetchObservaciones();
  }, [childId]);

  // Guardar observaciones
  const saveObservations = async () => {
    try {
      if (
        !observaciones.siesta ||
        !observaciones.baño ||
        !observaciones.merienda ||
        !observaciones.comentarios
      ) {
        Alert.alert("Error", "Por favor, complete todos los campos.");
        return;
      }

      await saveChildObservations(childId, observaciones);
      Alert.alert("Éxito", "Observaciones guardadas exitosamente.");
      navigateToScreen("SelectedRoom");
    } catch (error) {
      console.error("Error al guardar las observaciones:", error);
      Alert.alert("Error", "Hubo un problema al guardar las observaciones.");
    }
  };

  // Manejar cambios en los campos de observaciones
  const handleInputChange = (name, value) => {
    setObservaciones({
      ...observaciones,
      [name]: value,
    });
  };

  return {
    observaciones,
    handleInputChange,
    saveObservations,
  };
};

export default useChildObservations;