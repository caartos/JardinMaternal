import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import registerStyles from "../styles/src/registerStyles";
import LoggedOutHeader from "../components/Headers/LoggedOutHeader";
import Button from "../components/Buttons/Button";
import inputStyles from "../styles/input/inputStyles";
import buttonStyles from "../styles/button/buttonStyles";
import forgotPasswordStyles from "../styles/src/forgotPasswordStyles";
import CustomInput from "../components/Input/CustomInput";
import useForgotPassword from "../hooks/useForgotPassword";

const ForgotPassword = () => {
  const { handleForgotPassword, loading } = useForgotPassword();
  const [mail, setMail] = useState("");

  const handleInputChange = (value) => {
    setMail(value);
  };

  const handleSend = async () => {
    await handleForgotPassword(mail);
  };

  return (
    <SafeAreaView>
      <View style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={"Recuperar contraseña"} backButtonDestiny={"Main"} />
        <View style={forgotPasswordStyles.forgotPasswordMainViewTag}>
          <Text style={forgotPasswordStyles.forgotPasswordTextTag}>
            Escribe el mail con el que te registraste
          </Text>
          <CustomInput
            inputStyle={inputStyles.input}
            placeholder={"Mail"}
            value={mail}
            onChangeText={(mail) => handleInputChange(mail)}
          />
          <Button
            buttonRegularStyle={buttonStyles.regularButton}
            buttonParticularStyle={buttonStyles.saveButtonStyle}
            title={"Enviar"}
            titleStyle={buttonStyles.saveTextButtonStyle}
            onPress={handleSend}
            disabled={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
