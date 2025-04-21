import React from "react";
import { SafeAreaView, View } from "react-native";
import ChildHeader from "../components/Headers/ChildHeader";
import ChatButtonsView from "../components/View/ChatButtonsView";
import registerStyles from "../styles/src/registerStyles";
import ChildCommentsView from "../components/View/ChildCommentsView";
import CircularsView from "../components/View/CircularsView";
import { useSelector } from "react-redux";
import useGetRoomById from "../hooks/useGetRoomById";

const ChildMenu = () => {
  const child = useSelector((state) => state.child.selectedChild);
  console.log(child)
  const { room } = useGetRoomById(child.roomId);

  return (
    <SafeAreaView>
      <View style={registerStyles.registerMainViewTag}>
        <ChildHeader />
        <ChatButtonsView childName={child.nombre} room={room} />
        <ChildCommentsView childComments={child.observaciones}/>
        <CircularsView childRoomId={child.roomId}/>
      </View>
    </SafeAreaView>
  );
};

export default ChildMenu;
