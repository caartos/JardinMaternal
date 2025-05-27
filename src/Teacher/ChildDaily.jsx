import React from "react";
import { ScrollView, SafeAreaView, Text } from "react-native";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import buttonStyles from "../../styles/button/buttonStyles";
import inputStyles from "../../styles/input/inputStyles";
import Input from "../../components/Input/Input";
import titlesStyles from "../../styles/commons/titlesStyles";
import registerStyles from "../../styles/src/registerStyles";
import Button from "../../components/Buttons/Button";
import useChildObservations from "../../hooks/useChildObservations";
import { useSelector } from "react-redux";

const ChildDaily = ({ route }) => {
  const child = route.params.user;
  const loggedUser = useSelector((state) => state.user.user);
  const selectedRoom = useSelector((state) => state.room.selectedRoom);
  const room = loggedUser.rooms ? selectedRoom.title : null;
  const idRoom = loggedUser.rooms ? selectedRoom.id : null;

  const { observaciones, handleInputChange, saveObservations } = useChildObservations(
    child.id,
    child.observaciones
  );

  const handleSaveObservations = async () => {
    await saveObservations(idRoom);
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader
          title={`${child.nombre} ${child.apellido}`}
          backButtonDestiny={"SelectedRoom"}
        />
        <Text style={titlesStyles.createCircularTitle}>
          Observaciones del dia:
        </Text>
        <Input
          inputStyle={inputStyles.titleCircularInput}
          placeholder="Siesta"
          value={observaciones.siesta}
          onChangeText={(text) => handleInputChange("siesta", text)}
        />
        <Input
          inputStyle={inputStyles.titleCircularInput}
          placeholder="Baño"
          value={observaciones.baño}
          onChangeText={(text) => handleInputChange("baño", text)}
        />
        <Input
          inputStyle={inputStyles.titleCircularInput}
          placeholder="Merienda"
          value={observaciones.merienda}
          onChangeText={(text) => handleInputChange("merienda", text)}
        />
        <Input
          inputStyle={inputStyles.titleCircularInput}
          placeholder="Comentarios"
          value={observaciones.comentarios}
          onChangeText={(text) => handleInputChange("comentarios", text)}
        />
        <Button
          buttonRegularStyle={buttonStyles.createCircularButtonStyle}
          titleStyle={buttonStyles.createCircularTextButtonStyle}
          title="Crear observaciones"
          onPress={handleSaveObservations}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChildDaily;
