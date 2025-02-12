import React from "react";
import { Text, View } from "react-native";
import titlesStyles from "../../styles/commons/titlesStyles";
import ChildProfileButton from "../Buttons/ChildProfileButton";

const ChildHeader = ({child}) => {
  return (
    <View style={titlesStyles.topTitleMainViewTag}>
      <Text style={titlesStyles.topTitleLoggedInTextStyle}>{child.nombre}</Text>
      <ChildProfileButton destiny="Profile" child={child} />
    </View>
  );
};

export default ChildHeader;
