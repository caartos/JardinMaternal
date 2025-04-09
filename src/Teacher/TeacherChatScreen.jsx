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

const TeacherChatScreen = ({ route }) => {
  const { chatWith, parentId, room } = route.params;
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef(null);
  const sendBy = `${room.title}_`;
  const roomId = room.id; // ID de la sala
  const { messages, sendMessage } = useAdminChat(roomId, parentId, sendBy); // Reutiliza el hook `useChat`
  const handleSend = () => {
    sendMessage(newMessage);
    //sendMessage(newMessage, admin);
    setNewMessage("");
  };
  
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={chatStyles.chatMainViewTag}>
          <TeacherChatHeader chatWith={chatWith} room={room}/>
          <MessageList messages={messages} user={room} flatListRef={flatListRef} />
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