import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import chatStyles from "../../styles/src/chatStyles";
import MessageList from "../../components/Chat/MessageList";
import MessageInput from "../../components/Chat/MessageInput";
import useAdminChat from "../../hooks/useAdminChat";
import AdminChatHeader from "../../components/Headers/AdminChatHeader";

const AdminChatScreen = ({ route }) => {
  const { chatWith, parentId } = route.params;
  const admin = useSelector((state) => state.user.user); // La directora como usuario actual
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef(null);
  const { messages, sendMessage } = useAdminChat(admin, parentId); // Reutiliza el hook `useChat`
    console.log("MESSAGES =====> ", messages)
  const handleSend = () => {
    sendMessage(newMessage);
    //sendMessage(newMessage, admin);
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
          <AdminChatHeader chatWith={chatWith} />
          <MessageList messages={messages} user={admin} flatListRef={flatListRef} />
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

export default AdminChatScreen;