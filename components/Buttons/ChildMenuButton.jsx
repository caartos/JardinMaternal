import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import useNavigate from "../../utils/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectChild } from "../../actions/childActions";
import useNotifications from "../../hooks/useNotifications";
import notificationStyles from "../../styles/notification/notification";

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
        style={{ width: 110, height: 110, borderRadius: 10 }}
      />
      {unreadCount > 0 && (
        <View style={notificationStyles.notificationBadge}>
          <Text style={notificationStyles.notificationText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ChildMenuButton;
