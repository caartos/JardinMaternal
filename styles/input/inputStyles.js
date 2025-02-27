import { StyleSheet } from "react-native";

const inputStyles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    width: "85%",
    height: 55,
    borderRadius: 60,
    paddingLeft: 10,
    marginTop: 10,
  },
  inputViewTagStyle: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    height: "120",
  },
  inputTitleTextTag: {
    alignSelf: "left",
    marginLeft: "7.5%",
    fontWeight: "bold",
    fontSize: 15,
    color: "#436dff",
  },
  titleCircularInput: {
    alignSelf: "center",
    backgroundColor: "white",
    width: "85%",
    height: 55,
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    overflow: "hidden",
  },
  circularInput: {
    alignSelf: "center",
    backgroundColor: "white",
    width: "85%",
    height: 220,
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    overflow: "hidden",
  },
});

export default inputStyles;
