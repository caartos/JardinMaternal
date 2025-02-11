import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import LoggedInHeader from "../components/Headers/LoggedInHeader";
import useNavigate from "../utils/navigation";
import { useSelector } from "react-redux";
import Button from "../components/Buttons/Button";
import buttonStyles from "../styles/button/buttonStyles";
import registerStyles from "../styles/src/registerStyles";

const LoggedMenu = () => {
  const user = useSelector((state) => state.user.user);
  const navigateToScreen = useNavigate();
  console.log(user)
  const handleCreateChildProfile = () => {
    navigateToScreen("CreateChildProfile");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <LoggedInHeader title={"Hijos/as"} />
          <View style={[registerStyles.verificationCodeMainViewTag, {marginTop: 40}]} >
            {user.hijos && user.hijos.length > 0 ? (
              user.hijos.map((hijo, index) => (
                <Button
                  key={index}
                  title={hijo.nombre}
                  //onPress={() => navigation.navigate("ChildProfile", { hijoId: hijo.id })}
                  style={buttonStyles.regularButton}
                />
              ))
            ) : (
              <Text style={{marginBottom: 30}}>Aún no has añadido hijo/a a tu perfil</Text>
            )}
          <Button
            buttonRegularStyle={buttonStyles.regularButton}
            buttonParticularStyle={buttonStyles.registerButtonStyle}
            title="Añadir perfil de hijo/a"
            onPress={handleCreateChildProfile}
            style={buttonStyles.regularButton}
            />
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoggedMenu;
