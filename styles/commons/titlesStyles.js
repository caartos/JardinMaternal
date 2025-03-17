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
    color: "#e8aca0",
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
    color: "#e8aca0",
    width: "85%",
    height: "50",
    marginLeft: "7.5%",
    marginTop:30
  },
  childMenuHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50",
    backgroundColor: "#e5e5e5",
  },
  childMenuHeaderTitle: {
    color: "#e8aca0",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  chatHeaderTitle: {
    color: "#e8aca0",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    width:"85%",
    paddingRight:"15%"
  },
  createCircularTitle:{
    color: "#e8aca0",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    padding: 25
  },
  circularTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  circularContent: {
    fontSize: 16,
    marginTop: 10,
  },
  circularDate: {
    fontSize: 14,
    color: "#888",
  },
  childAndRoomText: {
    fontSize: 16,
    color: "#e8aca0",
    textAlign: "center",
  },
});

export default titlesStyles;
