import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { removeChildFromRoom } from "../config/db/child/child";
import { setChildren } from "../actions/childActions";
import { removeChildFromRoomArray } from "../config/db/room/room";

const useRemoveChildFromRoom = (childrenList, setChildrenList, roomId) => {
  const dispatch = useDispatch();

  const removeChild = async (childId) => {
    Alert.alert(
      "Sacar alumno",
      "¿Estás seguro de que deseas sacar este alumno del aula?",
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
              // Llama a la función para eliminar al niño de la sala en la base de datos
              await removeChildFromRoom(childId);
              await removeChildFromRoomArray(roomId, childId);
              // Filtra la lista de niños localmente
              const updatedChildrenList = childrenList.filter(
                (child) => child.id !== childId
              );

              // Actualiza el estado local
              setChildrenList(updatedChildrenList);

              // Actualiza el estado global en Redux
              dispatch(setChildren(updatedChildrenList));

              console.log(`Alumno ${childId} eliminado de la sala.`);
            } catch (error) {
              console.error("Error al remover al alumno del aula:", error);
            }
          },
        },
      ]
    );
  };

  return { removeChild };
};

export default useRemoveChildFromRoom;
