import React from "react";
import { View, Text, TextInput } from "react-native";
import inputStyles from "../../styles/input/inputStyles";

const CustomInput = ({
    label,
    fieldName,
    value,
    onChangeText,
    secureTextEntry = false,
    required = false,
  }) => (
    label ? (
      <View style={inputStyles.inputViewTagStyle}>
        <Text style={inputStyles.inputTitleTextTag}>
          {label}
          {required && "*"}
        </Text>
        <TextInput
          style={inputStyles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    ) : (
      <TextInput
        style={inputStyles.input}
        placeholder={fieldName}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    )
  );
export default CustomInput;
