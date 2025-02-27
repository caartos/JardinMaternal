import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import LoggedOutHeader from "../components/Headers/LoggedOutHeader";
import Button from "../components/Buttons/Button";
import registerStyles from "../styles/src/registerStyles";
import titlesStyles from "../styles/commons/titlesStyles";
import buttonStyles from "../styles/button/buttonStyles";
import Form from "../components/Form/Form";
import ProfileImagePicker from "../components/ProfileImagePicker/ProfileImagePicker";
import childFields from "../config/forms/childFields";
import BirthdayPicker from "../components/BirthdayPicker/BirthdayPicker";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import useUpdateChild from "../hooks/useUpdateChild";

const ChildProfile = () => {
  const child = useSelector((state) => state.child.selectedChild);
  const { handleUpdateChild } = useUpdateChild();

  const [selectedChild, setSelectedChild] = useState({
    nombre: child.nombre,
    apellido: child.apellido,
    nacionalidad: child.nacionalidad,
    dni: child.dni,
    profileImage: child.profileImage ? child.profileImage : null,
    fechaDeNacimiento: parseISO(child.fechaDeNacimiento),
    id: child.id,
  });
  
  const setChildImage = (imageUri) => {
    setSelectedChild((prevSelectedChild) => ({
      ...prevSelectedChild,
      profileImage: imageUri,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedChild({ ...selectedChild, fechaDeNacimiento: date });
  };

  const handleSave = async () => {
    const formattedDate = format(selectedChild.fechaDeNacimiento, "yyyy-MM-dd");
    const updatedChild = {
      ...selectedChild,
      fechaDeNacimiento: formattedDate,
    };
    handleUpdateChild(selectedChild.id, updatedChild);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={registerStyles.registerMainViewTag}>
          <LoggedOutHeader
            title={"Perfil del niño/a"}
            backButtonDestiny={"ChildMenu"}
            childName={selectedChild.nombre}
          />
          <View>
            <Text style={titlesStyles.titleStyle}>Datos del niño/a</Text>
            <View>
              <Form
                setData={setSelectedChild}
                fieldConfig={childFields}
                userData={selectedChild}
              />
              <ProfileImagePicker
                profileImage={selectedChild.profileImage}
                setProfileImage={setChildImage}
              />
              <BirthdayPicker
                date={selectedChild.fechaDeNacimiento}
                setDateChange={handleDateChange}
              />
            </View>
            <Button
              buttonRegularStyle={buttonStyles.regularButton}
              buttonParticularStyle={buttonStyles.saveButtonStyle}
              title={"Guardar"}
              titleStyle={buttonStyles.saveTextButtonStyle}
              onPress={handleSave}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChildProfile;
