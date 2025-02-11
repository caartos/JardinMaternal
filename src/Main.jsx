import React, { useState } from "react";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";
import Button from "../components/Buttons/Button";
import inputStyles from "../styles/input/inputStyles";
import buttonStyles from "../styles/button/buttonStyles";
import mainStyles from "../styles/src/mainStyles";
import ImageBackgroundStyles from "../styles/imageBackground";
import titlesStyles from "../styles/commons/titlesStyles";
import useNavigate from "../utils/navigation";
import { useSignIn } from "../hooks/useSignIn";
import Form from "../components/Form/Form";
import logInFields from "../config/forms/logInFields";

const Main = () => {
  const navigateToScreen = useNavigate();
  const { handleSignIn, loading } = useSignIn();

  const [user, setUserState] = useState({
    mail: "",
    contraseña: "",
  });

  const handleForgotPass = () => {
    navigateToScreen("ForgotPassword");
  };

  const handleLogIn = async () => {
    const mail = user.mail;
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
              <Form
                setData={setUserState}
                fieldConfig={logInFields}
                userData={user}
                style={inputStyles.inputViewTagStyle}
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
