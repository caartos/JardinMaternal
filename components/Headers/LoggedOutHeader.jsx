import React from "react";
import { Text, View } from "react-native";
import BackButton from "../Buttons/BackButton";
import titlesStyles from "../../styles/commons/titlesStyles";

const LoggedOutHeader = ({ title, destiny }) => {
  return (
    <View style={titlesStyles.topTitleMainViewTag}>
      <BackButton destiny={destiny} />
      <Text style={titlesStyles.topTitleTextStyle}>{title}</Text>
    </View>
  );
};

export default LoggedOutHeader;
