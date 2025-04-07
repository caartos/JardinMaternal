import { useEffect, useState } from "react";
import { fetchTeachersRoom } from "../config/db/room/room";

const useGetTeachersRooms = (teacherId) => {
  const [roomsList, setRoomsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!teacherId) {
        setRoomsList([]);
        setLoading(false);
        return;
      }

      try {
        const rooms = await fetchTeachersRoom(teacherId);
        setRoomsList(rooms);
      } catch (error) {
        console.error("Error al obtener las salas del maestro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [teacherId]);

  return { roomsList, loading };
};

export default useGetTeachersRooms;