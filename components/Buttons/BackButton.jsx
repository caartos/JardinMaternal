import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import useNavigate from "../../utils/navigation";

const BackButton = ({ destiny }) => {
  const navigateToScreen = useNavigate()
  
  return (
    <TouchableOpacity
      onPress={()=>navigateToScreen(destiny)}
      style={{ width: "15%", paddingLeft: 15 }}
    >
      <AntDesign name="arrowleft" size={22} color="#ffaa97" />
    </TouchableOpacity>
  );
};

export default BackButton;
