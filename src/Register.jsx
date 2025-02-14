import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import registerStyles from "../styles/src/registerStyles";
import Button from "../components/Buttons/Button";
import buttonStyles from "../styles/button/buttonStyles";
import titlesStyles from "../styles/commons/titlesStyles";
import LoggedOutHeader from "../components/Headers/LoggedOutHeader";
import CustomInput from "../components/Input/CustomInput";
import Form from "../components/Form/Form";
import userFields from "../config/forms/userFields";
import useSignUp from "../hooks/useSignUp";

const Register = () => {
  const {handleSignUp, loading} = useSignUp()
  
  const [newUser, setNewUser] = useState({
    //codigo: "",
    nombre: "",
    apellido: "",
    telefono1: "",
    telefono2: "",
    dni: "",
    mail: "",
    contraseña: "",
  });

  const handleInputChange = (name, value) => {
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSave = async () => {
    await handleSignUp(newUser);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={registerStyles.registerMainViewTag}>
          <LoggedOutHeader title={"Perfil del padre"} destiny={"Main"} />
          <View style={registerStyles.verificationCodeMainViewTag}>
            <Text style={registerStyles.verificationCodeTextTag}>
              Introduce el código que te ha proporcionado el centro
            </Text>
            {/*camiar a true cuando active la funcion del codigo*/}
            <CustomInput
              label="Codigo de vinculación"
              fieldName="codigo"
              value={newUser.codigo}
              onChangeText={(text) => handleInputChange("codigo", text)}
            />
          </View>
          <View>
            <Text style={titlesStyles.titleStyle}>Datos del padre/madre</Text>
              <Form setData={setNewUser} fieldConfig={userFields} userData={newUser}/>
            <Button
              buttonRegularStyle={buttonStyles.regularButton}
              buttonParticularStyle={buttonStyles.saveButtonStyle}
              title={"Guardar"}
              titleStyle={buttonStyles.saveTextButtonStyle}
              onPress={handleSave}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
