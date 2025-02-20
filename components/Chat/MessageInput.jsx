import React from "react";
import { View, TextInput } from "react-native";
import buttonStyles from "../../styles/button/buttonStyles";
import chatStyles from "../../styles/src/chatStyles";
import Button from "../Buttons/Button";


const MessageInput = ({ newMessage, setNewMessage, handleSend }) => {
  return (
    <View style={chatStyles.messageInputView}>
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Escribe un mensaje"
        multiline
        numberOfLines={4}
        style={chatStyles.messageTextInput}
      />
      <Button
        buttonRegularStyle={buttonStyles.sendChatButtonStyle}
        title="Send"
        titleStyle={buttonStyles.sendChatTextButtonStyle}
        onPress={handleSend}
      />
    </View>
  );
};

export default MessageInput;