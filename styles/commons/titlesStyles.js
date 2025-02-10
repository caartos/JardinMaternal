import { StyleSheet } from "react-native";

const titlesStyles = StyleSheet.create({
  topTitleMainViewTag: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "50",
    backgroundColor: "#e5e5e5",
  },
  topTitleTextStyle: {
    color: "#ffaa97",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    width: "85%",
    paddingRight: 50,
  },
  topTitleLoggedInTextStyle: {
    color: "#ffaa97",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    width: "85%",
    paddingLeft: 50,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ffaa97",
    width: "85%",
    height: "50",
    marginLeft: "7.5%",
  },
});

export default titlesStyles;
