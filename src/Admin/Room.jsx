import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import { useDispatch } from "react-redux";
import { fetchChildrenByRoomId, removeChildFromRoom } from "../../config/db/child/child";
import titlesStyles from "../../styles/commons/titlesStyles";
import buttonStyles from "../../styles/button/buttonStyles";
import Button from "../../components/Buttons/Button";

const Room = ({ route }) => {
  const dispatch = useDispatch();
  const { room } = route.params;
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

  const handleRemoveChild = async (childId) => {
    try {
      await removeChildFromRoom(childId);

      const updatedChildrenList = childrenList.filter((child) => child.id !== childId);
      setChildrenList(updatedChildrenList);

      dispatch(setChildren(updatedChildrenList));
    } catch (error) {
      console.error("Error al remover al alumno del aula:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={room.title} backButtonDestiny={"RoomAndChild"} />
        <Text style={titlesStyles.createCircularTitle}>Salita de {room.age}:</Text>
        {childrenList.length > 0 ? childrenList.map((child) => (
          <View key={child.id} style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignSelf: "center", alignItems: "center", marginVertical: 10 }}>
            <Text style={titlesStyles.childAndRoomText}>{child.nombre} {child.apellido}</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Button buttonRegularStyle={buttonStyles.chatRoomButton} title={"Chat"} titleStyle={buttonStyles.chatRoomButtonText} />
              <Button
                buttonRegularStyle={buttonStyles.removeChildButton}
                title="Sacar"
                titleStyle={buttonStyles.removeChildButtonText}
                onPress={() => handleRemoveChild(child.id)}
              />
            </View>
          </View>
        )) : <Text style={titlesStyles.childAndRoomText}>No hay niños sin sala</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Room;