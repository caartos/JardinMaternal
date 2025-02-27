import React, { use } from "react";
import { Image, TouchableOpacity } from "react-native";
import useNavigate from "../../utils/navigation";
import { useSelector } from "react-redux";

const ChildProfileButton = () => {
  const child = useSelector((state) => state.child.selectedChild);
  const navigateToScreen = useNavigate();

  return (
    <TouchableOpacity
      onPress={() =>
        navigateToScreen("ChildProfile", { childName: child.nombre })
      }
      style={{ width: "15%", paddingLeft: 5 }}
    >
      <Image
        source={
          child.profileImage
            ? { uri: child.profileImage }
            : require("../../assets/images/fondoCeleste.jpg")
        }
        style={{ width: 45, height: 45, borderRadius: 50 }}
      />
    </TouchableOpacity>
  );
};

export default ChildProfileButton;
