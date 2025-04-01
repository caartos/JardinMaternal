import { SafeAreaView, ScrollView, View, Text } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import { useEffect, useState } from "react";
import {
  assignRoomToChild,
  fetchChildrenWithoutRoom,
} from "../../config/db/child/child";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import Button from "../../components/Buttons/Button";
import buttonStyles from "../../styles/button/buttonStyles";
import useNavigate from "../../utils/navigation";
import { useDispatch } from "react-redux";
import { setChildren } from "../../actions/childActions";
import titlesStyles from "../../styles/commons/titlesStyles";
import IconButton from "../../components/Buttons/IconButton";
import ModalSelector from "react-native-modal-selector";
import useGetRooms from "../../hooks/useGetRooms";
import useGetChildrenWithoutRoom from "../../hooks/useGetChildrenWithoutRoom";

const RoomAndChild = () => {
  const navigateToScreen = useNavigate();
  const dispatch = useDispatch();
  const { roomsList } = useGetRooms();
  const { childrenList } = useGetChildrenWithoutRoom();
  const [selectedRoom, setSelectedRoom] = useState({});

  const navigateToCreateRoom = () => {
    navigateToScreen("CreateRoom");
  };

  const navigateToSelectedRoom = (room) => {
    navigateToScreen("Room", { room });
  };

  const handleAssignRoom = async (childId, roomId) => {
    await assignRoomToChild(childId, roomId);
    const updatedChildren = await fetchChildrenWithoutRoom();
    setChildList(updatedChildren);
    dispatch(setChildren(updatedChildren));
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader
          title={"Salas y alumnos"}
          backButtonDestiny={"AdminMenu"}
        />
        <View>
          <Text style={titlesStyles.createCircularTitle}>
            Niños sin sala asignada:
          </Text>
          {childrenList.length > 0 ? (
            childrenList.map((child) => (
              <View
                key={child.id}
                style={{
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignSelf: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text style={titlesStyles.childAndRoomText}>
                    {child.nombre} {child.apellido}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ModalSelector
                    data={roomsList.map((room) => ({
                      key: room.id,
                      label: room.title,
                    }))}
                    initValue={
                      selectedRoom[child.id]
                        ? roomsList.find(
                            (room) => room.id === selectedRoom[child.id]
                          )?.title
                        : "Seleccionar sala"
                    }
                    onChange={(option) =>
                      setSelectedRoom({
                        ...selectedRoom,
                        [child.id]: option.key,
                      })
                    }
                    style={{
                      height: 60,
                      width: 120,
                      justifyContent: "center",
                      borderRadius: 10,
                      borderColor: "#ccc",
                    }}
                    selectTextStyle={{ fontSize: 14 }}
                    optionContainerStyle={{ backgroundColor: "#fff3f1" }}
                    cancelStyle={{ backgroundColor: "#fff3f1" }}
                    cancelText="Cancelar"
                    optionTextStyle={{
                      fontSize: 14,
                      color: "#e8aca0",
                      backgroundColor: "#fff3f1",
                    }}
                  />
                  <IconButton
                    iconName={"arrowright"}
                    onPress={() =>
                      handleAssignRoom(child.id, selectedRoom[child.id])
                    }
                    color={"#6B7672"}
                    size={22}
                    disabled={!selectedRoom[child.id]}
                    particularStyle={buttonStyles.asignRoomToChildButton}
                  />
                </View>
              </View>
            ))
          ) : (
            <Text style={titlesStyles.childAndRoomText}>
              No hay niños sin sala
            </Text>
          )}
        </View>
        <View>
          <Text style={titlesStyles.createCircularTitle}>Salitas:</Text>
          {roomsList.map((room) => (
            <View key={room.id} style={{ marginVertical: 10 }}>
              <Button
                buttonRegularStyle={buttonStyles.createCircularButtonStyle}
                titleStyle={buttonStyles.createCircularTextButtonStyle}
                title={`Sala ${room.title}`}
                onPress={() => navigateToSelectedRoom(room)}
              />
            </View>
          ))}
        </View>
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          <Button
            buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
            title={"Crear aula"}
            titleStyle={buttonStyles.adminTextButtonStyle}
            onPress={navigateToCreateRoom}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomAndChild;
