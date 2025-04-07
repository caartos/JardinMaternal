import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { signIn } from "../config/auth";
import { setUser } from "../actions/userActions";
import useNavigate from "../utils/navigation";
import { fetchUserChildren } from "../config/db/child/child";
import { setChildren } from "../actions/childActions";

export const useSignIn = () => {
  const navigateToScreen = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (mail, contraseña) => {
    if (mail.length === 0 || contraseña.length === 0) {
      Alert.alert("Error", "Por favor, complete ambos campos.");
      return;
    }

    setLoading(true);
    try {
      const { userCredential, userData } = await signIn(
        mail.toLowerCase(),
        contraseña
      );

      dispatch(setUser(userData));
      if (userData.userType === "ADMIN") {
        navigateToScreen("AdminMenu");
      } else if (userData.userType === "PADRE") {
        const childrenList = await fetchUserChildren(userCredential.user.uid);
        dispatch(setChildren(childrenList));
        navigateToScreen("LoggedMenu");
      } else if (userData.userType === "MAESTRO") {
        navigateToScreen("TeachersMenu");
      } else {
        Alert.alert("Error", "Tipo de usuario desconocido.");
      }
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/invalid-credential"
      ) {
        Alert.alert(
          "Error",
          "El correo electrónico o la contraseña son incorrectos."
        );
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, loading };
};
