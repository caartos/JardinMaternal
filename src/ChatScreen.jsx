import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import ChatHeader from "../components/Headers/ChatHeader";
import chatStyles from "../styles/src/chatStyles";
import useChat from "../hooks/useChat";
import MessageList from "../components/Chat/MessageList";
import MessageInput from "../components/Chat/MessageInput";

const ChatScreen = ({ route }) => {
  const { chatWith, childName } = route.params; // "seño" o "directora"
  const user = useSelector((state) => state.user.user);
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef(null);
  const { messages, sendMessage } = useChat(user, chatWith);

  const handleSend = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={chatStyles.chatMainViewTag}>
          <ChatHeader chatWith={`Seño de la salita ${chatWith}`} childName={childName} />
          <MessageList messages={messages} user={user} flatListRef={flatListRef} />
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSend={handleSend}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
