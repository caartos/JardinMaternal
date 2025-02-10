import React, { useState } from "react";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";
import Button from "../components/Buttons/Button";
import inputStyles from "../styles/input/inputStyles";
import buttonStyles from "../styles/button/buttonStyles";
import mainStyles from "../styles/src/mainStyles";
import ImageBackgroundStyles from "../styles/imageBackground";
import titlesStyles from "../styles/commons/titlesStyles";
import useNavigate from "../utils/navigation";
import CustomInput from "../components/Input/CustomInput";
import { useSignIn } from "../hooks/useSignIn";

const Main = () => {
  const navigateToScreen = useNavigate();
  const { handleSignIn, loading } = useSignIn();

  const [user, setUserState] = useState({
    mail: "",
    contraseña: "",
  });

  const handleInputChange = (name, value) => {
    setUserState({
      ...user,
      [name]: value,
    });
  };

  const handleForgotPass = () => {
    navigateToScreen("ForgotPassword");
  };

  const handleLogIn = async () => {
    const mail = user.mail
    const contraseña = user.contraseña;
    handleSignIn(mail, contraseña);
  };

  const handleRegister = () => {
    navigateToScreen("Register");
  };

  return (
    <SafeAreaView>
      <ImageBackground
        style={ImageBackgroundStyles.ImageBackgroundStyle}
        source={require("../assets/images/fondoCeleste.jpg")}
        resizeMode="cover"
      >
        <View style={mainStyles.mainViewTagStyle}>
          <Text style={titlesStyles.titleStyle}>Iniciar Sesión</Text>
          <View style={mainStyles.mainElementsViewTagStyle}>
            <View style={inputStyles.inputViewTagStyle}>
              <CustomInput
                fieldName="Mail"
                value={user.mail}
                onChangeText={(text) => handleInputChange("mail", text)}
              />
              <CustomInput
                fieldName="Contraseña"
                value={user.contraseña}
                onChangeText={(text) => handleInputChange("contraseña", text)}
                secureTextEntry={true}
              />
            </View>
            <Button
              buttonRegularStyle={null}
              buttonParticularStyle={buttonStyles.forgotPasswordButtonStyle}
              title="He olvidado mi contraseña"
              titleStyle={buttonStyles.forgotPasswordButtontitleStyle}
              onPress={handleForgotPass}
            />
            <Button
              buttonRegularStyle={buttonStyles.regularButton}
              buttonParticularStyle={buttonStyles.logInButtonStyle}
              title="Entrar"
              titleStyle={buttonStyles.logInTextButtonStyle}
              onPress={handleLogIn}
              disabled={loading}
            />
            <Button
              buttonRegularStyle={buttonStyles.regularButton}
              buttonParticularStyle={buttonStyles.registerButtonStyle}
              title="Registrarse"
              titleStyle={buttonStyles.registerTextButtonStyle}
              onPress={handleRegister}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Main;
