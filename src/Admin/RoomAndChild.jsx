import { SafeAreaView, ScrollView } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import ChildsWithoutRoomView from "../../components/View/ChildsWithoutRoomView";
import RoomsView from "../../components/View/RoomsView";
import CreateRoomButton from "../../components/Buttons/CreateRoomButton";
import useGetRooms from "../../hooks/useGetRooms";
import useClearSelectedRoom from "../../hooks/useClearSelectedRoom";

const RoomAndChild = () => {
  const { roomsList } = useGetRooms();
  useClearSelectedRoom();

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader
          title={"Salas y alumnos"}
          backButtonDestiny={"AdminMenu"}
        />
        <ChildsWithoutRoomView />
        <RoomsView roomsList={roomsList} roomDestiny={"Room"}/>
        <CreateRoomButton />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomAndChild;
