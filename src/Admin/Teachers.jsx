import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, Alert } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import titlesStyles from "../../styles/commons/titlesStyles";
import buttonStyles from "../../styles/button/buttonStyles";
import useFetchTeachers from "../../hooks/useFetchTeachers";
import ModalSelector from "react-native-modal-selector";
import useGetRooms from "../../hooks/useGetRooms";
import IconButton from "../../components/Buttons/IconButton";
import useDeleteTeacher from "../../hooks/useDeleteTeacher";
import { assignRoomToTeacher } from "../../config/db/users/users";

const Teachers = () => {
  const { teachers } = useFetchTeachers();
  const { roomsList } = useGetRooms();
  const { deleteUser } = useDeleteTeacher();
  const [selectedRoom, setSelectedRoom] = useState({});

  const handleAssignRoomToTeacher = async (teacherId, roomId) => {
    await assignRoomToTeacher(teacherId, roomId);
  };

  const handleRemoveTeacher = (teacherId) => {
    Alert.alert(
      "Eliminar Maestro",
      "¿Estás seguro de que deseas eliminar este maestro?",
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
              await deleteUser(teacherId); // Llama a la función para eliminar al maestro
              console.log(`Maestro con ID ${teacherId} eliminado exitosamente.`);
            } catch (err) {
              console.error("Error al eliminar el maestro:", err);
              Alert.alert(
                "Error",
                `No se pudo eliminar el maestro: ${err.message}`
              );
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={"Maestros"} backButtonDestiny={"AdminMenu"} />
        <Text style={titlesStyles.createCircularTitle}>
          Todos los maestros:
        </Text>
        {teachers.length > 0 ? (
          teachers.map((teacher) => (
            <View
              key={teacher.id}
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text style={titlesStyles.childAndRoomText}>
                {teacher.nombre} {teacher.apellido}
              </Text>
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
                    selectedRoom[teacher.id]
                      ? roomsList.find(
                          (room) => room.id === selectedRoom[teacher.id]
                        )?.title
                      : "Seleccionar sala"
                  }
                  onChange={(option) =>
                    setSelectedRoom({
                      ...selectedRoom,
                      [teacher.id]: option.key,
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
                    handleAssignRoomToTeacher(
                      teacher.id,
                      selectedRoom[teacher.id]
                    )
                  }
                  color={"#6B7672"}
                  size={22}
                  disabled={!selectedRoom[teacher.id]}
                  particularStyle={buttonStyles.asignRoomToChildButton}
                />
                <IconButton
                  iconName={"deleteuser"}
                  onPress={() => handleRemoveTeacher(teacher.id)}
                  color={"#ffe9e4"}
                  size={22}
                  disabled={!selectedRoom[teacher.id]}
                  particularStyle={buttonStyles.deleteTeacherButton}
                />
              </View>
            </View>
          ))
        ) : (
          <Text style={titlesStyles.childAndRoomText}>No hay maestros</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Teachers;
