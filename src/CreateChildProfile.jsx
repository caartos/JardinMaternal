import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import childFields from "../config/forms/childFields";
import buttonStyles from "../styles/button/buttonStyles";
import titlesStyles from "../styles/commons/titlesStyles";
import Form from "../components/Form/Form";
import Button from "../components/Buttons/Button";
import LoggedOutHeader from "../components/Headers/LoggedOutHeader";
import registerStyles from "../styles/src/registerStyles";
import BirthdayPicker from "../components/BirthdayPicker/BirthdayPicker";
import { useSelector, useDispatch } from "react-redux";
import useNavigate from "../utils/navigation";
import { updateUser } from "../actions/userActions";
import { db } from "../config/firebaseConfig";
import useUpdateUser from "../hooks/useUpdateUser";

const CreateChildProfile = () => {
  const loggedUser = useSelector((state) => state.user.user);
  const { handleUpdateUser, loading } = useUpdateUser(loggedUser);
  const dispatch = useDispatch();
  const navigateToScreen = useNavigate();

  const [child, setChild] = useState({
    nombre: "",
    apellido: "",
    nacionalidad: "",
    dni: "",
    fechaDeNacimiento: new Date(),
  });

  const handleDateChange = (date) => {
    setChild({ ...child, fechaDeNacimiento: date });
  };

  const handleSave = async () => {
    // Verificar que todos los campos estén completos
    if (
      !child.nombre ||
      !child.apellido ||
      !child.nacionalidad ||
      !child.dni ||
      !child.fechaDeNacimiento
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    // Si tiene hijos, verificar si ya existe un hijo con el mismo nombre y DNI
    const hijoExistente = (loggedUser.hijos || []).find(
        (hijo) =>
          hijo.nombre.trim().toLowerCase() === child.nombre.trim().toLowerCase() ||
          hijo.dni.trim() === child.dni.trim()
      );
    if (hijoExistente) {
        // Si ya existe un hijo con el mismo nombre y DNI, mostrar una alerta
        Alert.alert("Error", "Ya existe un hijo/a con estos datos.");
        return;
    }
    
    const updatedUser = {
      ...loggedUser,
      hijos: [...(loggedUser.hijos || []), child],
    };
    handleUpdateUser(updatedUser);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <LoggedOutHeader title={"Perfil del niño/a"} destiny={"LoggedMenu"} />
        <View style={[registerStyles.registerMainViewTag, { paddingTop: 30 }]}>
          <Text style={titlesStyles.titleStyle}>Datos del niño/niña</Text>
          <Form setData={setChild} fieldConfig={childFields} userData={child} />
          <BirthdayPicker
            date={child.fechaDeNacimiento}
            setDateChange={handleDateChange}
          />
          <Button
            buttonRegularStyle={buttonStyles.regularButton}
            buttonParticularStyle={buttonStyles.saveButtonStyle}
            title={"Guardar"}
            titleStyle={buttonStyles.saveTextButtonStyle}
            onPress={handleSave}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateChildProfile;
