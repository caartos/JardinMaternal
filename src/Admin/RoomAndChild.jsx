import { SafeAreaView, ScrollView } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
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
