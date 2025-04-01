import { useEffect, useState } from "react";
import { fetchAvailableRooms } from "../config/db/room/room"; // Asegúrate de importar la función correcta

const useGetRooms = () => {
  const [roomsList, setRoomsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const rooms = await fetchAvailableRooms(); // Llama a la función para obtener las salas
        setRoomsList(rooms); // Actualiza el estado con los datos obtenidos
      } catch (err) {
        console.error("Error al cargar las salas:", err);
        setError(err); // Maneja errores
      }
    };

    loadRooms(); // Llama a la función al montar el componente
  }, []);

  return { roomsList, error };
};

export default useGetRooms;