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

const ChildDaily = ({ route }) => {
  const child = route.params.user;
  
  const { observaciones, handleInputChange, saveObservations } = useChildObservations(
    child.id,
    child.observaciones
  );

  const handleSaveObservations = async () => {
    await saveObservations();
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
