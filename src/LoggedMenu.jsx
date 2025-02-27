import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import LoggedInHeader from "../components/Headers/LoggedInHeader";
import useNavigate from "../utils/navigation";
import { useSelector } from "react-redux";
import Button from "../components/Buttons/Button";
import buttonStyles from "../styles/button/buttonStyles";
import registerStyles from "../styles/src/registerStyles";
import ChildMenuButton from "../components/Buttons/ChildMenuButton";

const LoggedMenu = () => {
  const children = useSelector((state) => state.child.children);
  const navigateToScreen = useNavigate();
  const handleCreateChildProfile = () => {
    navigateToScreen("CreateChildProfile");
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <View>
          <LoggedInHeader title={"Hijos/as"} backButtonDestiny={"LoggedMenu"} />
          <View
            style={[
              registerStyles.verificationCodeMainViewTag,
              { marginTop: 40 },
            ]}
          >
            {children && children.length > 0 ? (
              children.map((hijo) => (
                <View
                  key={hijo.dni}
                  style={{ alignItems: "center", marginBottom: 30 }}
                >
                  <ChildMenuButton
                    childId={hijo.id}
                  />
                  <Text>{hijo.nombre}</Text>
                </View>
              ))
            ) : (
              <Text style={{ marginBottom: 30 }}>
                Aún no has añadido hijo/a a tu perfil
              </Text>
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
