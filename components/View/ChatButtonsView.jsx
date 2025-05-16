import React from "react";
import Button from "../Buttons/Button";
import { StyleSheet, Text, View } from "react-native";
import buttonStyles from "../../styles/button/buttonStyles";
import useNavigate from "../../utils/navigation";
import { useSelector } from "react-redux";
import useNotifications from "../../hooks/useNotifications";

const ChatButtonsView = ({ childName, childId, room }) => {
  const user = useSelector((state) => state.user.user);
  const notifications = useNotifications(user.uid)
  const navigateToScreen = useNavigate();

  const teacherChatNotifications = notifications.filter(
      (notification) =>
        notification.childId === childId &&
        notification.type === "teacherChat" &&
        !notification.isRead
    );
    const directorChatNotifications = notifications.filter(
      (notification) =>
        notification.childId === childId &&
        notification.type === "directorChat" &&
        !notification.isRead
    );

  const handleChatWithSeño = () => {
    navigateToScreen("ChatScreen", { chatWith: room.title, childName, childId, notificationType: "teacherChat", room });
  };

  const handleChatWithDirectora = () => {
    navigateToScreen("ChatScreen", { chatWith: "directora", childName, childId, notificationType: "directorChat" });
  };

  return (
    <View style={buttonStyles.chatButtonsView}>
      <View style={styles.buttonContainer}>
        <Button
          title={"Chat con la seño"}
          buttonRegularStyle={buttonStyles.chatButtonStyle}
          titleStyle={buttonStyles.chatButtonText}
          onPress={handleChatWithSeño}
        />
        {teacherChatNotifications.length > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>
              {teacherChatNotifications.length}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={"Chat con dirección"}
          buttonRegularStyle={buttonStyles.chatButtonStyle}
          titleStyle={buttonStyles.chatButtonText}
          onPress={handleChatWithDirectora}
        />
        {directorChatNotifications.length > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>
              {directorChatNotifications.length}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "relative",
    marginBottom: 20,
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
  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ChatButtonsView;
