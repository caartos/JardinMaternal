import React from "react";
import { Image, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import useNavigate from "../../utils/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectChild } from "../../actions/childActions";
import useNotifications from "../../hooks/useNotifications";


const ChildMenuButton = ({ childId }) => {
  const dispatch = useDispatch();
  const navigateToScreen = useNavigate();
  const user = useSelector((state) => state.user.user);
  const notifications = useNotifications(user.uid);
  const children = useSelector((state) => state.child.children);
  const child = children.find((child) => child.id === childId);

  const unreadCount = notifications.filter(
    (notification) => notification.childId === childId && !notification.isRead
  ).length;

  const handlePress = () => {
    dispatch(selectChild(child));
    navigateToScreen("ChildMenu");
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginBottom: 10 }}>
      <Image
        source={
          child.profileImage
            ? { uri: child.profileImage }
            : require("../../assets/images/fondoCeleste.jpg")
        }
        style={{ width: 120, height: 120, borderRadius: 50 }}
      />
      {unreadCount > 0 && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    top: 5,
    right: 5,
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

export default ChildMenuButton;
