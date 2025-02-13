import React from "react";
import { Text, View } from "react-native";
import titlesStyles from "../../styles/commons/titlesStyles";
import ChildProfileButton from "../Buttons/ChildProfileButton";

const ChildHeader = ({childName}) => {
  return (
    <View style={titlesStyles.topTitleMainViewTag}>
      <Text style={titlesStyles.topTitleLoggedInTextStyle}>{childName}</Text>
      <ChildProfileButton destiny="Profile" childName={childName} />
    </View>
  );
};

export default ChildHeader;
