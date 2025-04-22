import { StyleSheet } from "react-native";

const registerStyles = StyleSheet.create({
  registerMainViewTag: {
    backgroundColor: "#ffe9e4",
    height:"100%",
    paddingBottom: 220,
  },
  photosAndVideosMainViewTag: {
    backgroundColor: "#ffe9e4",
    flex: 1,
  },
  verificationCodeMainViewTag: {
    alignItems: "center",
  },
  verificationCodeTextTag: {
    marginTop: 20,
    marginBottom: 30,
    color:"#001f8b"
  },
  verificationCodeTitleTextTag: {
    textAlign: "center",
    marginRight: "7.5%",
  },
  circularItem: {
    alignSelf:"center",
    width: "85%",
    backgroundColor: "#d1e7dd",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default registerStyles;
