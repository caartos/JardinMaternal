import React from "react";
import { Text, View } from "react-native";
import ProfileButton from "../Buttons/ProfileButton";
import titlesStyles from "../../styles/commons/titlesStyles";

const LoggedInHeader = ({title}) => {
  return (
    <View style={titlesStyles.topTitleMainViewTag}>
      <Text style={titlesStyles.topTitleLoggedInTextStyle}>{title}</Text>
      <ProfileButton destiny="Profile" />
    </View>
  );
};

export default LoggedInHeader;