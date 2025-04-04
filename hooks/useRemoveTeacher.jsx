import { Alert } from "react-native";
import { removeRoomFromTeacher } from "../config/db/users/users";

const useRemoveTeacher = (teachersList, setTeachersList) => {

  const removeTeacher = async (teacherId, roomId) => {
    Alert.alert(
      "Sacar maestro",
      "¿Estás seguro de que deseas sacar este maestro del aula?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              // Llama a la función para eliminar el roomId del maestro en la base de datos
              await removeRoomFromTeacher(teacherId, roomId);

              // Actualiza la lista de maestros localmente
              const updatedTeachersList = teachersList.filter(
                (teacher) => teacher.id !== teacherId
              );

              // Actualiza el estado local
              setTeachersList(updatedTeachersList);

              console.log(`Maestro ${teacherId} eliminado de la sala ${roomId}`);
            } catch (error) {
              console.error("Error al remover al maestro del aula:", error);
            }
          },
        },
      ]
    );
  };

  return { removeTeacher };
};

export default useRemoveTeacher;