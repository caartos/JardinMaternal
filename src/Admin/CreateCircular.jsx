import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View, ScrollView } from "react-native";
import AdminOptionsHeader from "../../components/Headers/AdminOptionsHeader";
import registerStyles from "../../styles/src/registerStyles";
import Input from "../../components/Input/Input";
import inputStyles from "../../styles/input/inputStyles";
import Button from "../../components/Buttons/Button";
import buttonStyles from "../../styles/button/buttonStyles";
import titlesStyles from "../../styles/commons/titlesStyles";
import { createCircular } from "../../config/db/circular/createCircular";
import useNavigate from "../../utils/navigation";
import { useSelector } from "react-redux";

const CreateCircular = () => {
  const loggedUser = useSelector((state) => state.user.user);
  console.log("Logged user:", loggedUser);
  const navigateToScreen = useNavigate()
  const [circular, setCircular] = useState({
    titulo: "",
    circular: "",
  });

  const navigateToAllCirculars = () => {
    navigateToScreen("AllCirculars");
  };
  const handleInputChange = (name, value) => {
    setCircular({
      ...circular,
      [name]: value,
    });
  };

  const handleCreateCircular = async () => {
    if (!circular.titulo || !circular.circular) {
      Alert.alert("Error", "Por favor, complete ambos campos.");
      return;
    }

    try {
      const cargo = loggedUser.userType === "ADMIN" ? "Directora" : "Seño";
      const destinatario = loggedUser.userType === "ADMIN" ? "Todos" : aula;

      await createCircular({
        titulo: circular.titulo,
        circular: circular.circular,
        nombre: loggedUser.nombre,
        cargo: cargo,
        destinatario: destinatario
      });
      Alert.alert("Éxito", "Circular creada exitosamente.");
      setCircular({ titulo: "", circular: "" }); // Limpiar los campos después de crear la circular
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la circular.");
      console.error("Error al crear la circular:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <AdminOptionsHeader
          title={"Circulares"}
          backButtonDestiny={"AdminMenu"}
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
