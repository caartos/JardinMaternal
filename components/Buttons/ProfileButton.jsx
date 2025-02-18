import React from "react";
import { Image, TouchableOpacity } from "react-native";
import useNavigate from "../../utils/navigation";
import { useSelector } from "react-redux";

const ProfileButton = ({ destiny }) => {
  const navigateToScreen = useNavigate()
  const loggedUser = useSelector((state) => state.user.user);
  
  return (
    <TouchableOpacity
    onPress={() => navigateToScreen(destiny)}
    style={{ width: "15%", paddingLeft:5}}
  >
    <Image
        source={
          loggedUser.profileImage
            ? { uri: loggedUser.profileImage }
            : require("../../assets/images/fondoCeleste.jpg")
        }
        style={{ width: 45, height: 45, borderRadius: 50 }}
      />
  </TouchableOpacity>
  );
};


export default ProfileButton;