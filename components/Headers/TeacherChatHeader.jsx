import React from "react";
import { Text, View } from "react-native";
import BackButton from "../Buttons/BackButton";
import titlesStyles from "../../styles/commons/titlesStyles";

const TeacherChatHeader = ({ chatWith, room }) => {

  return (
    <View style={titlesStyles.childMenuHeaderStyle}>
      <BackButton backButtonDestiny={"SelectedRoom"} params= {room}/>
      <Text style={titlesStyles.chatHeaderTitle}>Padre/Madre de {chatWith}</Text>
    </View>
  );
};

export default TeacherChatHeader;
