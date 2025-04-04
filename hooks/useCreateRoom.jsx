import { Alert } from "react-native";
import { createRoomInDB } from "../config/db/room/room";

const useCreateRoom = () => {
  const createRoom = async (room, setRoom) => {
    // Validación de campos
    if (!room.title.trim() || !room.age.trim()) {
      Alert.alert("Error", "Todos los campos deben estar completos.");
      return;
    }

    try {
      const roomId = await createRoomInDB(room);
      console.log("Sala creada con ID: ", roomId);

      // Limpiar los campos después de crear la sala
      setRoom({ title: "", age: "" });

      Alert.alert("Éxito", "Sala creada exitosamente.");
    } catch (error) {
      console.error("Error al crear la sala: ", error);
      Alert.alert("Error", "Hubo un problema al crear la sala.");
    }
  };

  return { createRoom };
};

export default useCreateRoom;