import React from "react";
import { Image, TouchableOpacity } from "react-native";
import useNavigate from "../../utils/navigation";
import { useSelector } from "react-redux";

const ChildProfileButton = ({ childName }) => {
  const user = useSelector((state) => state.user.user);
  const child = user.hijos.find((hijo) => hijo.nombre === childName);
  const navigateToScreen = useNavigate();

  return (
    <TouchableOpacity
      onPress={() => navigateToScreen("ChildProfile", { childName })}
      style={{ width: "15%", paddingLeft: 10 }}
    >
      <Image
        source={
          child.childImage
            ? { uri: child.childImage }
            : require("../../assets/images/fondoCeleste.jpg")
        }
        style={{ width: 45, height: 45, borderRadius: 50 }}
      />
    </TouchableOpacity>
  );
};

export default ChildProfileButton;
