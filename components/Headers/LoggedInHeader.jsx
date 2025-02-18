import React from "react";
import { Text, View } from "react-native";
import ProfileButton from "../Buttons/ProfileButton";
import titlesStyles from "../../styles/commons/titlesStyles";
import BackButton from "../Buttons/BackButton";

const LoggedInHeader = ({title}) => {
  return (
    <View style={titlesStyles.childMenuHeaderStyle}>
      <View style={{ width: "15%", paddingLeft: 15 }}></View>
      <Text style={titlesStyles.childMenuHeaderTitle}>{title}</Text>
      <ProfileButton destiny="Profile" />
    </View>
  );
};

export default LoggedInHeader;