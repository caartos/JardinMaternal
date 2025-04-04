import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import { useDispatch } from "react-redux";
import titlesStyles from "../../styles/commons/titlesStyles";
import buttonStyles from "../../styles/button/buttonStyles";
import Button from "../../components/Buttons/Button";
import useNavigate from "../../utils/navigation";
import useGetChildrenByRoomId from "../../hooks/useGetChildrenByRoomId";
import useGetTeachersByRoomId from "../../hooks/useGetTeachersByRoomId";
import useRemoveTeacher from "../../hooks/useRemoveTeacher";
import useRemoveChildFromRoom from "../../hooks/useRemoveChildFromRoom";
import useRemoveAllChildrenFromRoom from "../../hooks/useRemoveAllChildren";

const Room = ({ route }) => {
  const navigateToScreen = useNavigate();
  const dispatch = useDispatch();
  const { room } = route.params;
  const { childrenList, setChildrenList } = useGetChildrenByRoomId(room.id);
  const { teachersList, setTeachersList } = useGetTeachersByRoomId(room.id);

  const { removeTeacher } = useRemoveTeacher(teachersList, setTeachersList);
  const { removeChild } = useRemoveChildFromRoom(childrenList, setChildrenList);
  const { removeAllChildren } = useRemoveAllChildrenFromRoom(setChildrenList);

  const handleRemoveTeacher = async (teacherId) => {
    await removeTeacher(teacherId, room.id);
  };

  const handleChatWithChild = (chatWith, parentId) => {
    navigateToScreen("AdminChatScreen", { chatWith, parentId });
  };

  const handleRemoveChild = async (childId) => {
    await removeChild(childId)
  };

  const handleRemoveAllChildren = async () => {
    await removeAllChildren(room.id);
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader
          title={room.title}
          backButtonDestiny={"RoomAndChild"}
        />
        <Text style={titlesStyles.createCircularTitle}>
          Salita de {room.age}
        </Text>
        <Text style={titlesStyles.teachersList}>
          Maestras:
        </Text>
        {teachersList.length > 0 ? (
          teachersList.map((teacher) => (
            <View
              key={teacher.id}
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Text style={titlesStyles.teachersName}>
                {teacher.nombre} {teacher.apellido}
              </Text>
              <Button
                buttonRegularStyle={buttonStyles.removeChildButton}
                title="Sacar"
                titleStyle={buttonStyles.removeChildButtonText}
                onPress={() => handleRemoveTeacher(teacher.id)}
              />
            </View>
          ))
        ) : (
          <Text style={titlesStyles.childAndRoomText}>
            No hay maestras asignadas a esta sala
          </Text>
        )}
        <Text style={titlesStyles.childList}>
          Alumnos:
        </Text>
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
                  <Button
                    buttonRegularStyle={buttonStyles.removeChildButton}
                    title="Sacar"
                    titleStyle={buttonStyles.removeChildButtonText}
                    onPress={() => handleRemoveChild(child.id)}
                  />
                </View>
              </View>
            ))}
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Button
                buttonRegularStyle={buttonStyles.removeAllButton}
                title="Sacar a todos los alumnos"
                titleStyle={buttonStyles.removeAllButtonText}
                onPress={handleRemoveAllChildren}
              />
            </View>
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

export default Room;
