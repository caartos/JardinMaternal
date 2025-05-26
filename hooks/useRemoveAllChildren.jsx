import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { removeAllChildrenFromRoom } from "../config/db/child/child";
import { setChildren } from "../actions/childActions";
import { removeAllChildrenFromRoomArray } from "../config/db/room/room";

const useRemoveAllChildrenFromRoom = (setChildrenList) => {
  const dispatch = useDispatch();

  const removeAllChildren = async (roomId) => {
    Alert.alert(
      "Sacar a todos los alumnos",
      "¿Estás seguro de que deseas sacar a todos los alumnos del aula?",
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
              // Llama a la función para remover a todos los niños del aula en la base de datos
              await removeAllChildrenFromRoom(roomId);
              await removeAllChildrenFromRoomArray(roomId);
              // Actualiza la lista de niños localmente
              setChildrenList([]);

              // Actualiza el estado global en Redux
              dispatch(setChildren([]));

              console.log(
                `Todos los alumnos han sido removidos de la sala ${roomId}`
              );
            } catch (error) {
              console.error(
                "Error al remover a todos los alumnos del aula:",
                error
              );
            }
          },
        },
      ]
    );
  };

  return { removeAllChildren };
};

export default useRemoveAllChildrenFromRoom;
