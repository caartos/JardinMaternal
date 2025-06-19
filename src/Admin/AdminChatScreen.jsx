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
import useMarkNotificationsAsRead from "../../hooks/useMarkNotificationsAsRead";

const AdminChatScreen = ({ route }) => {
  const { chatWith, parentId, childId } = route.params;
  const admin = useSelector((state) => state.user.user); // La directora como usuario actual
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef(null);
  const adminId = admin.uid; // ID del admin (directora)
  const sendBy = "directora_";
  const { messages, sendMessage } = useAdminChat(adminId, parentId, sendBy, childId, "directorChat"); // Reutiliza el hook `useChat`
  const handleSend = () => {
    sendMessage(newMessage);
    //sendMessage(newMessage, admin);
    setNewMessage("");
  };
  useMarkNotificationsAsRead(admin?.userType, childId, "directorChat", admin.uid);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={chatStyles.chatMainViewTag}>
          <AdminChatHeader chatWith={chatWith} />
          <MessageList messages={messages} userId={adminId} flatListRef={flatListRef} />
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