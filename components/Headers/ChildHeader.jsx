import React from "react";
import { Text, View } from "react-native";
import titlesStyles from "../../styles/commons/titlesStyles";
import ChildProfileButton from "../Buttons/ChildProfileButton";
import BackButton from "../Buttons/BackButton";
import { useSelector } from "react-redux";

const ChildHeader = () => {
  const child = useSelector((state) => state.child.selectedChild);
  return (
    <View style={titlesStyles.childMenuHeaderStyle}>
      <BackButton backButtonDestiny={"LoggedMenu"}/>
      <Text style={titlesStyles.childMenuHeaderTitle}>{child.nombre}</Text>
      <ChildProfileButton destiny="Profile"  />
    </View>
  );
};

export default ChildHeader;
