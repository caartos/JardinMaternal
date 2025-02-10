import React from "react";
import { TextInput } from "react-native";

const Input = ({
  inputStyle,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={inputStyle}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default Input;
