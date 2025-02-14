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
import useUpdateUser from "../hooks/useUpdateUser";

const ChildProfile = ({route}) => {
  const {childName} = route.params
  const loggedUser = useSelector((state) => state.user.user);
  const child = loggedUser.hijos.find((hijo) => hijo.nombre === childName);
  const { handleUpdateUser, loading} = useUpdateUser(loggedUser)

  const [selectedChild, setSelectedChild] = useState({
    nombre: child.nombre,
    apellido: child.apellido,
    nacionalidad: child.nacionalidad,
    dni: child.dni,
    profileImage: child.profileImage ? child.profileImage : null,
    fechaDeNacimiento: parseISO(child.fechaDeNacimiento),
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
    const formattedDate = format(child.fechaDeNacimiento, "yyyy-MM-dd");

    const updatedChild = {
      ...selectedChild,
      fechaDeNacimiento: formattedDate,
    };

    const updatedHijos = loggedUser.hijos.map((hijo) =>
      hijo.dni === selectedChild.dni ? updatedChild : hijo
    );

    const updatedUser = {
      ...loggedUser,
      hijos: updatedHijos,
    };
    
    handleUpdateUser(updatedUser)
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
                profileImage={selectedChild.profileImage}
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
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChildProfile;
