import React from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import LoggedInHeader from "../../components/Headers/LoggedInHeader";
import registerStyles from "../../styles/src/registerStyles";
import Button from "../../components/Buttons/Button";
import buttonStyles from "../../styles/button/buttonStyles";
import useNavigate from "../../utils/navigation";
import { useSelector } from "react-redux";
import useNotifications from "../../hooks/useNotifications";
import notificationStyles from "../../styles/notification/notification";

const TeachersMenu = () => {
  const user = useSelector((state) => state.user.user);
  const notifications = useNotifications(user.uid);
  const unreadCount = notifications.filter(
    (notification) => notification.isRead === false
  ).length;
  console.log(notifications);
  const navigateToScreen = useNavigate();

  const navigateToRooms = () => {
    navigateToScreen("Rooms");
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedInHeader
          title={`${user.nombre}`}
          backButtonDestiny={"TeachersMenu"}
        />
        <View
          style={{ position: "relative", alignSelf: "center", paddingTop: 10, marginTop: 10 }}
        >
          <Button
            buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
            title={"Salas"}
            titleStyle={buttonStyles.adminTextButtonStyle}
            onPress={navigateToRooms}
          />
          {unreadCount > 0 && (
            <View style={notificationStyles.notificationBadge}>
              <Text style={notificationStyles.notificationText}>
                {unreadCount}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeachersMenu;
