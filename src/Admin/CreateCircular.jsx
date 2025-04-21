import React, { useState } from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import AdminOptionsHeader from "../../components/Headers/AdminOptionsHeader";
import registerStyles from "../../styles/src/registerStyles";
import Input from "../../components/Input/Input";
import inputStyles from "../../styles/input/inputStyles";
import Button from "../../components/Buttons/Button";
import buttonStyles from "../../styles/button/buttonStyles";
import titlesStyles from "../../styles/commons/titlesStyles";
import useNavigate from "../../utils/navigation";
import { useSelector } from "react-redux";
import useCreateCircular from "../../hooks/useCreateCircular";

const CreateCircular = ({route}) => {
  const backButtonDestiny = route.params
  const loggedUser = useSelector((state) => state.user.user);
  const selectedRoom = useSelector((state) => state.room.selectedRoom);
  console.log("selectedRoom", selectedRoom)
  const room = loggedUser.rooms ? selectedRoom.title : null;
  const idRoom = loggedUser.rooms ? selectedRoom.id : null;
  const navigateToScreen = useNavigate()
  const { createCircularHandler } = useCreateCircular();
  const [circular, setCircular] = useState({
    titulo: "",
    circular: "",
  });

  const navigateToAllCirculars = () => {
    navigateToScreen("AllCirculars", backButtonDestiny);
  };

  const handleInputChange = (name, value) => {
    setCircular({
      ...circular,
      [name]: value,
    });
  };

  const handleCreateCircular = async () => {
    await createCircularHandler(circular, loggedUser, room, idRoom, setCircular);
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <AdminOptionsHeader
          title={"Circulares"}
          backButtonDestiny={backButtonDestiny}
        />
        <Text style={titlesStyles.createCircularTitle}>
          Crear una nueva circular
        </Text>
        <Input
          inputStyle={inputStyles.titleCircularInput}
          placeholder="Título"
          value={circular.titulo}
          onChangeText={(text) => handleInputChange("titulo", text)}
        />
        <Input
          inputStyle={inputStyles.circularInput}
          placeholder="Nueva Circular"
          value={circular.circular}
          onChangeText={(text) => handleInputChange("circular", text)}
          multiline={true}
        />
        <Button
          buttonRegularStyle={buttonStyles.createCircularButtonStyle}
          titleStyle={buttonStyles.createCircularTextButtonStyle}
          title="Crear circular"
          onPress={handleCreateCircular}
        />
        <Button
          buttonRegularStyle={buttonStyles.allCircularsButtonStyle}
          title={"Ver todas las circulares"}
          titleStyle={buttonStyles.adminTextButtonStyle}
          onPress={navigateToAllCirculars}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateCircular;
