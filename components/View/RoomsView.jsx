import React from "react";
import { Text, View } from "react-native";
import Button from "../Buttons/Button";
import titlesStyles from "../../styles/commons/titlesStyles";
import buttonStyles from "../../styles/button/buttonStyles";
import useNavigate from "../../utils/navigation";

const RoomsView = ({ roomsList, roomDestiny }) => {
  const navigateToScreen = useNavigate();

  const navigateToSelectedRoom = (room) => {
    navigateToScreen(roomDestiny, { room });
  };

  return (
    <View>
      <Text style={titlesStyles.createCircularTitle}>Salitas:</Text>
      {roomsList.map((room) => (
        <View key={room.id} style={buttonStyles.roomsButtonView}>
          <Button
            buttonRegularStyle={buttonStyles.createCircularButtonStyle}
            titleStyle={buttonStyles.createCircularTextButtonStyle}
            title={`Sala ${room.title}`}
            onPress={() => navigateToSelectedRoom(room)}
          />
        </View>
      ))}
    </View>
  );
};

export default RoomsView;
