import React from "react";
import { Text, View } from "react-native";
import ProfileButton from "../Buttons/ProfileButton";
import titlesStyles from "../../styles/commons/titlesStyles";

const LoggedInHeader = ({title, backButtonDestiny}) => {
  return (
    <View style={titlesStyles.childMenuHeaderStyle}>
      <View style={{ width: "15%", paddingLeft: 15 }}></View>
      <Text style={titlesStyles.childMenuHeaderTitle}>{title}</Text>
      <ProfileButton title={title} backButtonDestiny={backButtonDestiny} />
    </View>
  );
};

export default LoggedInHeader;