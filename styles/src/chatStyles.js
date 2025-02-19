import { StyleSheet } from "react-native";

const chatStyles = StyleSheet.create({
    chatMainViewTag: {
      backgroundColor: "#ffe9e4",
      flex: 1,
    },
    inputContainer: {
      backgroundColor: "#e8aca0",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: 10,
    },
    textInput: {
      padding: 10,
      marginBottom: 5,
      width: "90%",
      alignSelf: "center",
      borderRadius: 10,
      backgroundColor: "white",
    },
    messageContainer: {
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      maxWidth: "80%",
      alignSelf: "flex-start",
    },
    myMessage: {
      alignSelf: "flex-end",
      backgroundColor: "#d1e7dd",
    },
    theirMessage: {
      alignSelf: "flex-start",
      backgroundColor: "#f8d7da",
    },
    messageText: {
      fontSize: 16,
    },
  });
  

export default chatStyles
