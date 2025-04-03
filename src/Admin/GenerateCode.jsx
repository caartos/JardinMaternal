import React from "react";
import { Alert, SafeAreaView, ScrollView, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import Button from "../../components/Buttons/Button";
import buttonStyles from "../../styles/button/buttonStyles";
import { createCode } from "../../config/db/generateCode/generateCode";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";

const GenerateCode = () => {

  const generateParentCode = async () => {
    const newCode = await createCode("alumno-")
    Alert.alert("Codigo:", newCode);
    console.log("Codigo para padre generado", newCode);
  };

  const generateTeacherCode = async () => {
    const newCode = await createCode("maestro-")
    Alert.alert("Codigo:", newCode);
    console.log("Codigo para padre generado", newCode);
  }

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={"Generar código"} backButtonDestiny={"AdminMenu"} />
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          <Button
            buttonRegularStyle={buttonStyles.createCircularButtonStyle}
            titleStyle={buttonStyles.createCircularTextButtonStyle}
            //buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
            //titleStyle={buttonStyles.adminTextButtonStyle}
            title={"Codigo para padres"}
            onPress={generateParentCode}
          />
          <Button
            buttonRegularStyle={buttonStyles.createCircularButtonStyle}
            titleStyle={buttonStyles.createCircularTextButtonStyle}
            //buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
            //titleStyle={buttonStyles.adminTextButtonStyle}
            title={"Codigo para profesores"}
            onPress={generateTeacherCode}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GenerateCode;
