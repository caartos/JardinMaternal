import React from "react";
import { FlatList, View, Text } from "react-native";
import chatStyles from "../../styles/src/chatStyles";

const MessageList = ({ messages, user, flatListRef }) => {
    
  return (
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
      //contentContainerStyle={{ paddingBottom: 20 }}
      inverted // Mueve los mensajes nuevos al final de la pantalla
    />
  );
};

export default MessageList;