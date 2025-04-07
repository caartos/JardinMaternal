import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import titlesStyles from "../../styles/commons/titlesStyles";
import buttonStyles from "../../styles/button/buttonStyles";
import Button from "../../components/Buttons/Button";
import useNavigate from "../../utils/navigation";
import useGetChildrenByRoomId from "../../hooks/useGetChildrenByRoomId";

const SelectedRoom = ({ route }) => {
  const navigateToScreen = useNavigate();
  const { room } = route.params;
  const {childName} = route.params; 
  console.log("SELECTEDROOM", room);
  const { childrenList } = useGetChildrenByRoomId(room.id);
  const handleChatWithChild = (chatWith, parentId) => {
    navigateToScreen("TeacherChatScreen", { chatWith, parentId, room });
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={room.title} backButtonDestiny={"Rooms"} />
        <Text style={titlesStyles.createCircularTitle}>
          Salita de {room.age}
        </Text>
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
                <Text style={titlesStyles.childAndRoomText}>
                  {child.nombre} {child.apellido}
                </Text>
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
                      handleChatWithChild(child.nombre, child.parentId)
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
