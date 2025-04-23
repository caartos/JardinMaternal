import { StyleSheet } from "react-native";

const modalSelectorStyles = StyleSheet.create({
  modalSelector: {
    height: 60,
    width: 120,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ccc",
  },
  multimediaModalView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageAndVideoMini: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  imageAndVideo: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  multimediaScrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default modalSelectorStyles;
