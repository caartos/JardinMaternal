import React from "react";
import { View } from "react-native";
import buttonStyles from "../../styles/button/buttonStyles";
import Button from "./Button";
import useNavigate from "../../utils/navigation";

const CreateRoomButton = () => {
  const navigateToScreen = useNavigate();

  const navigateToCreateRoom = () => {
    navigateToScreen("CreateRoom");
  };

  return (
    <View style={buttonStyles.createRoomButtonView}>
      <Button
        buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
        title={"Crear aula"}
        titleStyle={buttonStyles.adminTextButtonStyle}
        onPress={navigateToCreateRoom}
      />
    </View>
  );
};

export default CreateRoomButton;
