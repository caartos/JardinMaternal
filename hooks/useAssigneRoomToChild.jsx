import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { assignRoomToChild, fetchChildrenWithoutRoom } from "../config/db/child/child";
import { setChildren } from "../actions/childActions";
import { addChildToRoom } from "../config/db/room/room";

const useAssignRoomToChild = (setChildrenList) => {
  const dispatch = useDispatch();

  const assignRoom = async (childId, roomId) => {
    if (!roomId) {
      Alert.alert("Error", "Necesitas seleccionar una sala.");
      return;
    }

    try {
      // Asignar la sala al niño
      await assignRoomToChild(childId, roomId);

      await addChildToRoom(roomId, childId);
      // Actualizar la lista de niños sin sala
      const updatedChildren = await fetchChildrenWithoutRoom();
      setChildrenList(updatedChildren);

      // Actualizar el estado global en Redux
      dispatch(setChildren(updatedChildren));

      console.log(`Sala ${roomId} asignada al niño ${childId}`);
    } catch (error) {
      console.error("Error al asignar la sala:", error);
      Alert.alert("Error", "Hubo un problema al asignar la sala.");
    }
  };

  return { assignRoom };
};

export default useAssignRoomToChild;