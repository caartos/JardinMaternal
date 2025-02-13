import React from "react";
import { Image, TouchableOpacity } from "react-native";
import useNavigate from "../../utils/navigation";

const ChildMenuButton = ({ childName, childImage }) => {
  const navigateToScreen = useNavigate()
  const handlePress = () => {
    navigateToScreen("ChildMenu",  {childName} )
  }

  return (
    <TouchableOpacity
    onPress={handlePress}
    style={{ marginBottom: 10 }}
  >
    <Image
        source={
          childImage
            ? { uri: childImage }
            : require("../../assets/images/fondoCeleste.jpg")
        }
        style={{ width: 120, height: 120, borderRadius: 50 }}
      />
  </TouchableOpacity>
  );
};


export default ChildMenuButton;