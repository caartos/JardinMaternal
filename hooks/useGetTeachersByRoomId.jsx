import { useEffect, useState } from "react";
import { fetchTeachersByRoomId } from "../config/db/users/users"; // Asegúrate de que la ruta sea correcta

const useGetTeachersByRoomId = (roomId) => {
  const [teachersList, setTeachersList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const teachers = await fetchTeachersByRoomId(roomId);
        setTeachersList(teachers);
      } catch (err) {
        console.error("Error al obtener maestras por roomId:", err);
        setError(err);
      }
    };

    getTeachers();
  }, [roomId]);

  return { teachersList, error };
};

export default useGetTeachersByRoomId;