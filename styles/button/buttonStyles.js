import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  forgotPasswordButtonStyle: {
    marginTop: 25,
  },
  forgotPasswordButtontitleStyle: {
    color: "#ffaa97",
  },
  regularButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    height: "60",
    borderRadius: 60,
    borderWidth: "3",
  },
  logInButtonStyle: {
    marginTop: 25,
    borderColor: "#ffaa97",
    backgroundColor: "white",
  },
  registerButtonStyle: {
    marginTop: 13,
    borderColor: "white",
    backgroundColor: "#e8aca0",
  },
  logInTextButtonStyle: {
    color: "#ffaa97",
  },
  registerTextButtonStyle: {
    color: "white",
  },
  saveButtonStyle: {
    borderColor: "#436dff",
    backgroundColor: "#c9d5ff",
    alignSelf: "center",
    marginTop: 30,
  },
  saveTextButtonStyle: {
    color: "#436dff",
  },
  chatButtonsView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
    borderRadius: 50,
    paddingVertical: 20,
  },
  chatButtonStyle: {
    width: "45%",
    height: 140,
    borderRadius: 30,
    backgroundColor: "#e8aca0",
    alignItems: "center",
    justifyContent: "center",
  },
  chatButtonText: {
    color: "#fff3f1",
    fontWeight: "bold",
  },
  sendChatButtonStyle: {
    backgroundColor: "#ffe9e4",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 60,
  },
  sendChatTextButtonStyle: {
    color: "#e8aca0",
  },
});

export default buttonStyles;
