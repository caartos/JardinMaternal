import React from "react";
import { Text, View } from "react-native";
import BackButton from "../Buttons/BackButton";
import titlesStyles from "../../styles/commons/titlesStyles";

const AdminOptionsHeader = ({ title, backButtonDestiny }) => {
  return (
    <View style={titlesStyles.childMenuHeaderStyle}>
      <BackButton title={title} backButtonDestiny={backButtonDestiny} />
      <Text style={titlesStyles.chatHeaderTitle}>{title}</Text>
    </View>
  );
};

export default AdminOptionsHeader;
