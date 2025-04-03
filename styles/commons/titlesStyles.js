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
    marginTop: 30
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
    width: "85%",
    paddingRight: "15%"
  },
  createCircularTitle: {
    color: "#e8aca0",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 20
  },
  teachersList: {
    color: "#6B7672",
    fontWeight: "bold",
    fontSize: 17,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  childList: {
    color: "#e8aca0",
    fontWeight: "bold",
    fontSize: 17,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  teachersName: {
    fontWeight: "normal",
    fontSize: 16,
    color: "#6B7672",
    paddingBottom: 10
  },
  circularSender: {
    fontSize: 18,
    fontWeight: "bold",
  },
  circularTitle: {
    fontSize: 18,
    fontWeight: "bold",

  },
  circularContent: {
    fontSize: 16,
    marginTop: 5,
  },
  circularDate: {
    fontSize: 14,
    color: "#888",
    paddingBottom: 10
  },
  childAndRoomText: {
    fontWeight: "normal",
    fontSize: 16,
    color: "#e8aca0",
    textAlign: "center",
  },
  childrenListView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  childrenListTitleView: {
    width: "50%",
  }
});

export default titlesStyles;
