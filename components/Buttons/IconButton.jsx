import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { Entypo } from "react-native-vector-icons";

const IconButton = ({ iconName, onPress, size, particularStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ width: "50", alignItems: "center", margin: 10}, particularStyle]}
      
    >
      {iconName == "cross" ? (
        <Entypo name={iconName} size={size} color="#6B7672" />
      ) : (
        <AntDesign name={iconName} size={size} color="#6B7672"  />
      )}

    </TouchableOpacity>
  );
};

export default IconButton;
