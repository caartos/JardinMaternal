import React from "react";
import Button from "../Buttons/Button";
import { View } from "react-native";
import buttonStyles from "../../styles/button/buttonStyles";

const ChatButtonsView = () => {
  return (
    <View style={buttonStyles.chatButtonsView}>
      <Button title={"Chat con la seño"} buttonRegularStyle={buttonStyles.chatButtonStyle} titleStyle={buttonStyles.chatButtonText}/>
      <Button title={"Chat con dirección"} buttonRegularStyle={buttonStyles.chatButtonStyle} titleStyle={buttonStyles.chatButtonText}/>
    </View>
  );
};

export default ChatButtonsView;
