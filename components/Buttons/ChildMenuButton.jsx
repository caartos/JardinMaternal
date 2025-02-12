import React from "react";
import { Image, TouchableOpacity } from "react-native";
import useNavigate from "../../utils/navigation";

const ChildMenuButton = ({ child }) => {
  const navigateToScreen = useNavigate()
  const handlePress = () => {
    navigateToScreen("ChildMenu",  {child} )
  }

  return (
    <TouchableOpacity
    onPress={handlePress}
    style={{ marginBottom: 10 }}
  >
    <Image
        source={
          child.childImage
            ? { uri: child.childImage }
            : require("../../assets/images/fondoCeleste.jpg")
        }
        style={{ width: 120, height: 120, borderRadius: 50 }}
      />
  </TouchableOpacity>
  );
};


export default ChildMenuButton;