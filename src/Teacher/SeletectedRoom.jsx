import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import titlesStyles from "../../styles/commons/titlesStyles";
import buttonStyles from "../../styles/button/buttonStyles";
import Button from "../../components/Buttons/Button";
import useNavigate from "../../utils/navigation";
import useGetChildrenByRoomId from "../../hooks/useGetChildrenByRoomId";
import { useSelector } from "react-redux";

const SelectedRoom = () => {
  const navigateToScreen = useNavigate();
  const room = useSelector((state) => state.room.selectedRoom);
  const { childrenList } = useGetChildrenByRoomId(room?.id || "");

  if (!room) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={titlesStyles.childAndRoomText}>
          Error: No se encontró la información de la sala.
        </Text>
      </SafeAreaView>
    );
  }

  const navigateToCreateCircular = () => {
    navigateToScreen("CreateCircular", (backButtonDestiny = "SelectedRoom"));
  };

  const handleChatWithChild = (chatWith, parentId, childId) => {
    navigateToScreen("TeacherChatScreen", { chatWith, parentId, room, childId });
  };

  const handlePhotosAndVideos = () => {
    navigateToScreen("PhotosAndVideos", { backButtonDestiny: "SelectedRoom" });
  };



  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={room.title} backButtonDestiny={"Rooms"} />
        <Text style={titlesStyles.createCircularTitle}>
          Salita de {room.age}
        </Text>
        <Button
          buttonRegularStyle={buttonStyles.createCircularButtonStyle}
          titleStyle={buttonStyles.createCircularTextButtonStyle}
          title={"Mandar una circular"}
          onPress={navigateToCreateCircular}
        />
        <Button
          buttonRegularStyle={buttonStyles.createCircularButtonStyle}
          titleStyle={buttonStyles.createCircularTextButtonStyle}
          title={"Fotos y videos"}
          onPress={handlePhotosAndVideos}
        />
        <Text style={titlesStyles.childList}>Alumnos:</Text>
        {childrenList.length > 0 ? (
          <View>
            {childrenList.map((child) => (
              <View
                key={child.id}
                style={{
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigateToScreen("ChildDaily", {
                      user: child,
                    })
                  }
                >
                  <Text style={titlesStyles.childAndRoomText}>
                    {child.nombre} {child.apellido}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    buttonRegularStyle={buttonStyles.chatRoomButton}
                    title={"Chat"}
                    titleStyle={buttonStyles.chatRoomButtonText}
                    onPress={() =>
                      handleChatWithChild(child.nombre, child.parentId, child.id)
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={titlesStyles.childAndRoomText}>
            No hay niños sin sala
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectedRoom;
