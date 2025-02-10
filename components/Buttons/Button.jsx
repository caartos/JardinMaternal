import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({
  buttonRegularStyle,
  buttonParticularStyle,
  title,
  titleStyle,
  onPress,
  disabled= false
}) => {
  

  return (
    <TouchableOpacity
      style={[buttonRegularStyle, buttonParticularStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
