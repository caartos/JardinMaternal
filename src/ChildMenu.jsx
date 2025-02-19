import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import ChildHeader from "../components/Headers/ChildHeader";
import ChatButtonsView from "../components/View/ChatButtonsView";
import registerStyles from "../styles/src/registerStyles";
import ChildCommentsView from "../components/View/ChildCommentsView";
import CircularsView from "../components/View/CircularsView";

const ChildMenu = ({ route }) => {
  const { childName } = route.params;

  return (
    <SafeAreaView>
      <View style={registerStyles.registerMainViewTag}>
        <ChildHeader childName={childName} />
        <ChatButtonsView childName={childName}/>
        <ChildCommentsView />
        <CircularsView />
      </View>
    </SafeAreaView>
  );
};

export default ChildMenu;
