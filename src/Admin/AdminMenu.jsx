import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import LoggedInHeader from "../../components/Headers/LoggedInHeader";
import registerStyles from "../../styles/src/registerStyles";
import Button from "../../components/Buttons/Button";
import buttonStyles from "../../styles/button/buttonStyles";
import notificationStyles from "../../styles/notification/notification";
import useNavigate from "../../utils/navigation";
import useNotifications from "../../hooks/useNotifications";
import { useSelector } from "react-redux";

const AdminMenu = () => {
  const user = useSelector((state) => state.user.user);

  const navigateToScreen = useNavigate();
  const notifications = useNotifications(user.uid);
 
  const unreadCount = notifications.filter(
    (notification) => notification.isRead === false
  ).length;

  const navigateToCreateCircular = () => {
    navigateToScreen("CreateCircular", (backButtonDestiny = "AdminMenu"));
  };

  const navigateToGenerateCode = () => {
    navigateToScreen("GenerateCode", {userId: user.uid});
  };
  const navigateToRoomAndChild = () => {
    navigateToScreen("RoomAndChild");
  };
  const navigateToTeachers = () => {
    navigateToScreen("Teachers");
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedInHeader title={"Directora"} backButtonDestiny={"AdminMenu"} />
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          <Button
            buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
            title={"Circulares"}
            titleStyle={buttonStyles.adminTextButtonStyle}
            onPress={navigateToCreateCircular}
          />
          <Button
            buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
            title={"Generar codigo"}
            titleStyle={buttonStyles.adminTextButtonStyle}
            onPress={navigateToGenerateCode}
          />
          <View>
            <Button
              buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
              title={"Salas y alumnos"}
              titleStyle={buttonStyles.adminTextButtonStyle}
              onPress={navigateToRoomAndChild}
            />
            {unreadCount > 0 && (
              <View style={notificationStyles.notificationBadge}>
                <Text style={notificationStyles.notificationText}>
                  {unreadCount}
                </Text>
              </View>
            )}
          </View>
          <Button
            buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
            title={"Maestros"}
            titleStyle={buttonStyles.adminTextButtonStyle}
            onPress={navigateToTeachers}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminMenu;
