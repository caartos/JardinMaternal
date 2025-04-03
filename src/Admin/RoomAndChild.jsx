import { SafeAreaView, ScrollView, View, Text } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import { useState } from "react";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import Button from "../../components/Buttons/Button";
import buttonStyles from "../../styles/button/buttonStyles";
import useNavigate from "../../utils/navigation";
import titlesStyles from "../../styles/commons/titlesStyles";
import useGetRooms from "../../hooks/useGetRooms";
import ChildsWithoutRoomView from "../../components/View/ChildsWithoutRoomView";
import RoomsView from "../../components/View/RoomsView";

const RoomAndChild = () => {

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader
          title={"Salas y alumnos"}
          backButtonDestiny={"AdminMenu"}
        />
        <ChildsWithoutRoomView />
        <RoomsView />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomAndChild;
