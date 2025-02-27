import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import childFields from "../config/forms/childFields";
import buttonStyles from "../styles/button/buttonStyles";
import titlesStyles from "../styles/commons/titlesStyles";
import Form from "../components/Form/Form";
import Button from "../components/Buttons/Button";
import LoggedOutHeader from "../components/Headers/LoggedOutHeader";
import registerStyles from "../styles/src/registerStyles";
import BirthdayPicker from "../components/BirthdayPicker/BirthdayPicker";
import { useSelector } from "react-redux";
import ProfileImagePicker from "../components/ProfileImagePicker/ProfileImagePicker";
import useCreateChild from "../hooks/useCreateChild";


const CreateChildProfile = () => {
  const loggedUser = useSelector((state) => state.user.user);
  const { createChild } = useCreateChild(loggedUser.uid);

  const [child, setChild] = useState({
    nombre: "",
    apellido: "",
    nacionalidad: "",
    dni: "",
    profileImage: "",
    fechaDeNacimiento: new Date(),
  });

  const setChildImage = (imageUri) => {
    setChild((prevChild) => ({
      ...prevChild,
      profileImage: imageUri,
    }));
  };

  const handleDateChange = (date) => {
    setChild({ ...child, fechaDeNacimiento: date });
  };

  const handleSave = async () => {
    createChild(child);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <LoggedOutHeader title={"Perfil del niño/a"} backButtonDestiny={"LoggedMenu"} />
        <View style={[registerStyles.registerMainViewTag]}>
          <Text style={titlesStyles.titleStyle}>Datos del niño/niña</Text>
          <Form setData={setChild} fieldConfig={childFields} userData={child} />
          <ProfileImagePicker
            profileImage={child.profileImage}
            setProfileImage={setChildImage}
          />
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
