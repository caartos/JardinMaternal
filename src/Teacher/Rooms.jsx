import React, { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import registerStyles from "../../styles/src/registerStyles";
import useGetTeachersRooms from "../../hooks/useGetTeachersRooms";
import { useDispatch, useSelector } from "react-redux";
import RoomsView from "../../components/View/RoomsView";
import { clearSelectedRoom } from "../../reducers/roomReducer";

const Rooms = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { roomsList } = useGetTeachersRooms(user.uid);

  useEffect(() => {
    dispatch(clearSelectedRoom());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={"Salas"} backButtonDestiny={"TeachersMenu"} />
        <RoomsView roomsList={roomsList} roomDestiny={"SelectedRoom"}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rooms;
