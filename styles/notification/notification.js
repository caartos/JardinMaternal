import { StyleSheet } from "react-native";

const notificationStyles = StyleSheet.create({
  childButton: {
    position: "relative",
    marginBottom: 10,
  },
  childImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  teacherNotificationBadge: {
    position: "absolute",
    top: 3,
    right: 0,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  teacherNotificationRoomsBadge: {
    position: "absolute",
    top: 3,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default notificationStyles;
