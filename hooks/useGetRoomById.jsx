import { useEffect, useState } from "react";
import { fetchRoomById } from "../config/db/room/room"; // Asegúrate de que la ruta sea correcta

const useGetRoomById = (roomId) => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) {
        setRoom(null);
        setLoading(false);
        return;
      }
      try {
        const roomData = await fetchRoomById(roomId); // Llama a la función fetchRoomById
        setRoom(roomData);
      } catch (err) {
        console.error("Error al obtener la sala:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  return { room, loading, error };
};

export default useGetRoomById;