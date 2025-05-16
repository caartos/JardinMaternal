import { useState, useEffect } from "react";
import { fetchCircularsByRoomOrAll } from "../config/db/circular/createCircular";

const useFetchCircularsByRoomOrAll = (childRoomId) => {
  const [circulars, setCirculars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!childRoomId) return;

    const unsubscribe = fetchCircularsByRoomOrAll(
      childRoomId,
      (updatedCirculars) => setCirculars(updatedCirculars), // Callback para actualizar el estado
      (error) => setError(error) // Callback para manejar errores
    );

    return () => {
      if (unsubscribe) unsubscribe(); // Limpiar la suscripción al desmontar
    };
  }, [childRoomId]);

  return { circulars, error };
};

export default useFetchCircularsByRoomOrAll;