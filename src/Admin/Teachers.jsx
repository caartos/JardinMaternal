import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import titlesStyles from "../../styles/commons/titlesStyles";
import buttonStyles from "../../styles/button/buttonStyles";
import Button from "../../components/Buttons/Button";
import { fetchTeachers } from "../../config/db/users/users";

const Teachers = () => {
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const teachers = await fetchTeachers();
        console.log("TEACHERS", teachers) 
        setTeacherList(teachers); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error("Error al cargar los maestros:", error);
      }
    };
    loadTeachers();
  }, []);

  const handleRemoveTeacher = (teacherId) => {
    // Lógica para eliminar al maestro
    console.log(`Eliminar maestro con ID: ${teacherId}`);
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={"Maestros"} backButtonDestiny={"AdminMenu"} />
        <Text style={titlesStyles.createCircularTitle}>
          Todos los maestros:
        </Text>
        {teacherList.length > 0 ? (
          teacherList.map((teacher) => (
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
                <Button
                  buttonRegularStyle={buttonStyles.chatRoomButton}
                  title={"Chat"}
                  titleStyle={buttonStyles.chatRoomButtonText}
                />
                <Button
                  buttonRegularStyle={buttonStyles.removeChildButton}
                  title="Sacar"
                  titleStyle={buttonStyles.removeChildButtonText}
                  onPress={() => handleRemoveTeacher(teacher.id)}
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
