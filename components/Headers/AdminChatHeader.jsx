import React from "react";
import { Text, View } from "react-native";
import BackButton from "../Buttons/BackButton";
import titlesStyles from "../../styles/commons/titlesStyles";

const AdminChatHeader = ({ chatWith }) => {
  return (
    <View style={titlesStyles.childMenuHeaderStyle}>
      <BackButton backButtonDestiny={"AdminMenu"} />{" "} 
      //deberia volver a Room con los datos de la respectiva Room 
      <Text style={titlesStyles.chatHeaderTitle}>Padre/Madre de {chatWith}</Text>
    </View>
  );
};

export default AdminChatHeader;
