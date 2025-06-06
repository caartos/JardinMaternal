import React from "react";
import { Text, View } from "react-native";
import BackButton from "../Buttons/BackButton";
import titlesStyles from "../../styles/commons/titlesStyles";

const ChatHeader = ({chatWith, childName}) => {

  return (
    <View style={titlesStyles.childMenuHeaderStyle}>
      <BackButton backButtonDestiny={"ChildMenu"} childName={childName}/>
      <Text style={titlesStyles.chatHeaderTitle}>{chatWith}</Text>
    </View>
  );
};

export default ChatHeader;
