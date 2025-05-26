import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import registerStyles from "../../styles/src/registerStyles";
import useGetTeachersRooms from "../../hooks/useGetTeachersRooms";
import { useSelector } from "react-redux";
import RoomsView from "../../components/View/RoomsView";
import useClearSelectedRoom from "../../hooks/useClearSelectedRoom";

const Rooms = () => {
  const user = useSelector((state) => state.user.user);
  const { roomsList } = useGetTeachersRooms(user.uid);

  useClearSelectedRoom();

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={"Salas"} backButtonDestiny={"TeachersMenu"} />
        <RoomsView
          roomsList={roomsList}
          roomDestiny={"SelectedRoom"}
          userId={user.uid}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rooms;
