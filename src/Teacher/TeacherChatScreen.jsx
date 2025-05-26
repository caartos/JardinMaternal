import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import chatStyles from "../../styles/src/chatStyles";
import MessageList from "../../components/Chat/MessageList";
import MessageInput from "../../components/Chat/MessageInput";
import useAdminChat from "../../hooks/useAdminChat";
import TeacherChatHeader from "../../components/Headers/TeacherChatHeader";
import { useSelector } from "react-redux";
import useMarkNotificationsAsRead from "../../hooks/useMarkNotificationsAsRead";

const TeacherChatScreen = ({ route }) => {
  const { chatWith, parentId, room, childId } = route.params;
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const sendBy = `${room.title}_`;
  const roomId = room.id; // ID de la sala
  const { messages, sendMessage } = useAdminChat(
    roomId,
    parentId,
    sendBy,
    childId,
    "teacherChat"
  ); // Reutiliza el hook `useChat`
  const handleSend = () => {
    sendMessage(newMessage);
    //sendMessage(newMessage, admin);
    setNewMessage("");
  };

  useMarkNotificationsAsRead(user?.userType, childId, "teacherChat", user.uid);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={chatStyles.chatMainViewTag}>
          <TeacherChatHeader chatWith={chatWith} room={room} />
          <MessageList
            messages={messages}
            userId={room.id}
            flatListRef={flatListRef}
          />
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

export default TeacherChatScreen;
