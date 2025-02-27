import React from "react";
import { Text, View } from "react-native";
import BackButton from "../Buttons/BackButton";
import titlesStyles from "../../styles/commons/titlesStyles";

const LoggedOutHeader = ({ title, backButtonDestiny, childName=null }) => {
  return (
    <View style={titlesStyles.topTitleMainViewTag}>
      <BackButton  childName={childName} backButtonDestiny={backButtonDestiny}/>
      <Text style={titlesStyles.topTitleTextStyle}>{title}</Text>
    </View>
  );
};

export default LoggedOutHeader;
