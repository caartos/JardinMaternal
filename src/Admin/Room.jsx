import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import { fetchChildrenByRoomId } from "../../config/db/child/child";

const Room = ({ route }) => {

  const {room}  = route.params;
  const [childrenList, setChildrenList] = useState([]);

  useEffect(() => {
    const getChildrenList = async () => {
      try {
        const children = await fetchChildrenByRoomId(room.id);
        setChildrenList(children);
      } catch (error) {
        console.error("Error al obtener los niños por roomId:", error);
      }
    };
    getChildrenList();
}, [room.id]);

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
      <LoggedOutHeader title={room.title} backButtonDestiny={"RoomAndChild"} />
          <Text>Salita de {room.age}:</Text>
          {childrenList.length > 0 ? (
            childrenList.map((child) => (
              <View key={child.id} style={{ marginVertical: 10 }}>
                <Text>{child.nombre} {child.apellido}</Text>
              </View>
            ))
          ) : (
            <Text>No hay alumnos en esta sala.</Text>
          )}
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default Room;