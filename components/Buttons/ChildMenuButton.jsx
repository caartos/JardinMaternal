import React from "react";
import { Image, TouchableOpacity } from "react-native";
import useNavigate from "../../utils/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectChild } from "../../actions/childActions";

const ChildMenuButton = ({ childId }) => {
  const dispatch = useDispatch();
  const navigateToScreen = useNavigate();
  const children = useSelector((state) => state.child.children);
  const child = children.find((child) => child.id === childId);

  const handlePress = () => {
    dispatch(selectChild(child));
    navigateToScreen("ChildMenu");
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginBottom: 10 }}>
      <Image
        source={
          child.profileImage
            ? { uri: child.profileImage }
            : require("../../assets/images/fondoCeleste.jpg")
        }
        style={{ width: 120, height: 120, borderRadius: 50 }}
      />
    </TouchableOpacity>
  );
};

export default ChildMenuButton;
