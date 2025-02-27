import React from "react";
import { TextInput } from "react-native";

const Input = ({
  inputStyle,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  multiline= false
}) => {
  return (
    <TextInput
      style={inputStyle}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
    />
  );
};

export default Input;
