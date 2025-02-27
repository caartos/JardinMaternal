import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import LoggedOutHeader from "../components/Headers/LoggedOutHeader";
import Button from "../components/Buttons/Button";
import registerStyles from "../styles/src/registerStyles";
import titlesStyles from "../styles/commons/titlesStyles";
import buttonStyles from "../styles/button/buttonStyles";
import Form from "../components/Form/Form";
import userFields from "../config/forms/userFields";
import ProfileImagePicker from "../components/ProfileImagePicker/ProfileImagePicker";
import useUpdateUser from "../hooks/useUpdateUser";

const Profile = ({route}) => {
  const loggedUser = useSelector((state) => state.user.user);
  const { handleUpdateUser, loading } = useUpdateUser(loggedUser);
  const {title, backButtonDestiny} = route.params

  const [user, setUser] = useState({
    uid: loggedUser.uid,
    nombre: loggedUser.nombre,
    apellido: loggedUser.apellido,
    telefono1: loggedUser.telefono1,
    telefono2: loggedUser.telefono2,
    dni: loggedUser.dni,
    mail: loggedUser.mail,
    profileImage: loggedUser.profileImage ? loggedUser.profileImage : null,
    hijos: loggedUser.hijos || [],
  });

  const setProfileImage = (imageUri) => {
    setUser((prevUser) => ({
      ...prevUser,
      profileImage: imageUri,
    }));
  };

  const handleSave = async () => {
    await handleUpdateUser(user);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={`Perfil de ${title}`} backButtonDestiny={backButtonDestiny} />
          <View>
            <Text style={titlesStyles.titleStyle}>Datos de {title}</Text>
            <View>
              <ProfileImagePicker
                profileImage={user.profileImage}
                setProfileImage={setProfileImage}
              />
              <Form
                setData={setUser}
                fieldConfig={userFields}
                userData={user}
              />
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

export default Profile;
