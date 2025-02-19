import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import ChatHeader from "../components/Headers/ChatHeader";
import chatStyles from "../styles/src/chatStyles";
import Button from "../components/Buttons/Button";
import buttonStyles from "../styles/button/buttonStyles";

const ChatScreen = ({ route }) => {
  const { chatWith, childName } = route.params; // "seño" or "directora"

  const user = useSelector((state) => state.user.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.uid),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, [user]);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "chats"), {
      text: newMessage,
      sender: user.uid,
      participants: [user.uid, chatWith],
      timestamp: serverTimestamp(), // 👈 Usa `serverTimestamp()` para mejor orden
    });

    setNewMessage(""); // Limpia el input
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={chatStyles.chatMainViewTag}>
          <ChatHeader chatWith={chatWith} childName={childName} />
          <FlatList
            ref={flatListRef}
            data={[...messages].reverse()} // Invertimos manualmente los mensajes
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  chatStyles.messageContainer,
                  item.sender === user.uid
                    ? chatStyles.myMessage
                    : chatStyles.theirMessage,
                ]}
              >
                <Text style={chatStyles.messageText}>{item.text}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            inverted // Mueve los mensajes nuevos al final de la pantalla
          />

          <View
            style={{
              backgroundColor: "#e8aca0",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: 10,
            }}
          >
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Escribe un mensaje"
              multiline
              numberOfLines={4}
              style={{
                padding: 10,
                marginBottom: 5,
                width: "90%",
                alignSelf: "center",
                borderRadius: 10,
                backgroundColor: "white",
              }}
            />
            <Button
              buttonRegularStyle={buttonStyles.sendChatButtonStyle}
              title="Send"
              titleStyle={buttonStyles.sendChatTextButtonStyle}
              onPress={handleSend}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
