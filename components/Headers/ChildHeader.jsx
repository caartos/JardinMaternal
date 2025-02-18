import React from "react";
import { Text, View } from "react-native";
import titlesStyles from "../../styles/commons/titlesStyles";
import ChildProfileButton from "../Buttons/ChildProfileButton";
import BackButton from "../Buttons/BackButton";

const ChildHeader = ({childName}) => {
  return (
    <View style={titlesStyles.childMenuHeaderStyle}>
      <BackButton destiny={"LoggedMenu"}/>
      <Text style={titlesStyles.childMenuHeaderTitle}>{childName}</Text>
      <ChildProfileButton destiny="Profile" childName={childName} />
    </View>
  );
};

export default ChildHeader;
