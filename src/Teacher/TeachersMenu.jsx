import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import LoggedInHeader from "../../components/Headers/LoggedInHeader";
import registerStyles from "../../styles/src/registerStyles";
import Button from "../../components/Buttons/Button";
import buttonStyles from "../../styles/button/buttonStyles";
import useNavigate from "../../utils/navigation";
import { useSelector } from "react-redux";

const TeachersMenu = () => {
  const user = useSelector((state) => state.user.user);
  const navigateToScreen = useNavigate();

  const navigateToRooms = () => {
    navigateToScreen("Rooms");
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedInHeader title={`${user.nombre}`} backButtonDestiny={"TeachersMenu"} />
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          <Button
            buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
            title={"Salas"}
            titleStyle={buttonStyles.adminTextButtonStyle}
            onPress={navigateToRooms}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeachersMenu;
