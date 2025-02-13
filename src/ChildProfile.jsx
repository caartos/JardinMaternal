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
import { parseISO } from "date-fns";
import { useSelector } from "react-redux";

const ChildProfile = ({route}) => {
  const {childName} = route.params
  const user = useSelector((state) => state.user.user);
  const child = user.hijos.find((hijo) => hijo.nombre === childName);

  const [selectedChild, setSelectedChild] = useState({
    nombre: child.nombre,
    apellido: child.apellido,
    nacionalidad: child.nacionalidad,
    dni: child.dni,
    profileImage: child.childImage ? child.childImage : null,
    fechaDeNacimiento: parseISO(child.fechaDeNacimiento),
  });
 
  const setChildImage = (imageUri) => {
    setSelectedChild((prevSelectedChild) => ({
      ...prevSelectedChild,
      childImage: imageUri,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedChild({ ...child, fechaDeNacimiento: date });
  };

  const handleSave = async () => {
    console.log("Actualizado el pendejo")
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={registerStyles.registerMainViewTag}>
          <LoggedOutHeader title={"Perfil del niño/a"} destiny={"ChildMenu"} childName={childName} />
          <View>
            <Text style={titlesStyles.titleStyle}>Datos del niño/a</Text>
            <View>
              <Form
                setData={setSelectedChild}
                fieldConfig={childFields}
                userData={selectedChild}
              />
              <ProfileImagePicker
                profileImage={child.childImage}
                setProfileImage={setChildImage}
              />
              <BirthdayPicker date={selectedChild.fechaDeNacimiento} setDateChange={handleDateChange}/>
            </View>
            <Button
              buttonRegularStyle={buttonStyles.regularButton}
              buttonParticularStyle={buttonStyles.saveButtonStyle}
              title={"Guardar"}
              titleStyle={buttonStyles.saveTextButtonStyle}
              onPress={handleSave}
              //disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChildProfile;
