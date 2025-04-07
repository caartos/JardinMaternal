import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import registerStyles from "../../styles/src/registerStyles";
import useGetTeachersRooms from "../../hooks/useGetTeachersRooms";
import { useSelector } from "react-redux";
import RoomsView from "../../components/View/RoomsView";

const Rooms = () => {
  const user = useSelector((state) => state.user.user);
  const { roomsList } = useGetTeachersRooms(user.uid);

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={"Salas"} backButtonDestiny={"TeachersMenu"} />
        <RoomsView roomsList={roomsList} roomDestiny={"SelectedRoom"}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rooms;
