import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import { useDispatch } from "react-redux";
import {
  fetchChildrenByRoomId,
  removeAllChildrenFromRoom,
  removeChildFromRoom,
} from "../../config/db/child/child";
import titlesStyles from "../../styles/commons/titlesStyles";
import buttonStyles from "../../styles/button/buttonStyles";
import Button from "../../components/Buttons/Button";
import useNavigate from "../../utils/navigation";
import useGetChildrenByRoomId from "../../hooks/useGetChildrenByRoomId";
import useGetTeachersByRoomId from "../../hooks/useGetTeachersByRoomId";
import { removeRoomFromTeacher } from "../../config/db/users/users";
import { setChildren } from "../../actions/childActions";

const Room = ({ route }) => {
  const navigateToScreen = useNavigate();
  const dispatch = useDispatch();
  const { room } = route.params;
  const { childrenList, setChildrenList } = useGetChildrenByRoomId(room.id);
  const { teachersList, setTeachersList } = useGetTeachersByRoomId(room.id);

  const handleRemoveTeacher = async (teacherId) => {
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
              await removeRoomFromTeacher(teacherId, room.id);

              // Actualiza la lista de maestros localmente
              const updatedTeachersList = teachersList.filter(
                (teacher) => teacher.id !== teacherId
              );

              // Aquí puedes actualizar el estado si es necesario
              setTeachersList(updatedTeachersList);

              console.log(`Maestro ${teacherId} eliminado de la sala ${room.id}`);
            } catch (error) {
              console.error("Error al remover al maestro del aula:", error);
            }
          },
        },
      ]
    );

  };

  const handleChatWithChild = (chatWith, parentId) => {
    navigateToScreen("AdminChatScreen", { chatWith, parentId });
  };

  const handleRemoveChild = async (childId) => {
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
              await removeChildFromRoom(childId);

              const updatedChildrenList = childrenList.filter(
                (child) => child.id !== childId
              );
              setChildrenList(updatedChildrenList);

              dispatch(setChildren(updatedChildrenList));
            } catch (error) {
              console.error("Error al remover al alumno del aula:", error);
            }
          },
        },
      ]
    );
  };

  const handleRemoveAllChildren = async () => {
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
              // Llama a la función para remover a todos los niños del aula
              await removeAllChildrenFromRoom(room.id);

              // Actualiza la lista de niños localmente
              setChildrenList([]);

              // Actualiza el estado global en Redux
              dispatch(setChildren([]));

              console.log(`Todos los alumnos han sido removidos de la sala ${room.id}`);
            } catch (error) {
              console.error("Error al remover a todos los alumnos del aula:", error);
            }
          },
        },
      ]
    );
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
