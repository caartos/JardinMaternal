import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import LoggedInHeader from "../../components/Headers/LoggedInHeader";
import registerStyles from "../../styles/src/registerStyles";
import Button from "../../components/Buttons/Button";
import buttonStyles from "../../styles/button/buttonStyles";
import useNavigate from "../../utils/navigation";

const AdminMenu = () => {
  const navigateToScreen = useNavigate()

  const navigateToCreateCircular = () => {
    navigateToScreen("CreateCircular", backButtonDestiny = "AdminMenu");
  };

  const navigateToGenerateCode = () => {
    navigateToScreen("GenerateCode");
  }
  const navigateToRoomAndChild = () => {
    navigateToScreen("RoomAndChild");
  }
  const navigateToTeachers = () => {
    navigateToScreen("Teachers");
  }

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedInHeader title={"Directora"} backButtonDestiny={"AdminMenu"}/>
        <View style={{alignItems: "center", paddingTop: 20}}>
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
          <Button
            buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
            title={"Salas y alumnos"}
            titleStyle={buttonStyles.adminTextButtonStyle}
            onPress={navigateToRoomAndChild}
          />
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
