import React from "react";
import Button from "../Buttons/Button";
import { View } from "react-native";
import buttonStyles from "../../styles/button/buttonStyles";
import useNavigate from "../../utils/navigation";

const ChatButtonsView = ({childName, room}) => {
  const navigateToScreen = useNavigate()

  const handleChatWithSeño = () => {
    navigateToScreen("ChatScreen", { chatWith: room.title, childName });
  };

  const handleChatWithDirectora = () => {
    navigateToScreen("ChatScreen", { chatWith: "directora", childName });
  };

  return (
    <View style={buttonStyles.chatButtonsView}>
      <Button title={"Chat con la seño"} buttonRegularStyle={buttonStyles.chatButtonStyle} titleStyle={buttonStyles.chatButtonText} onPress={handleChatWithSeño}/>
      <Button title={"Chat con dirección"} buttonRegularStyle={buttonStyles.chatButtonStyle} titleStyle={buttonStyles.chatButtonText} onPress={handleChatWithDirectora}/>
    </View>
  );
};

export default ChatButtonsView;
