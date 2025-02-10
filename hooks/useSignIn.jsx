import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { signIn } from "../config/auth";
import { setUser } from "../actions/userActions";
import useNavigate from "../utils/navigation";

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
      const { userCredential, userData } = await signIn(mail.toLowerCase(), contraseña);
      dispatch(setUser(userData));
      navigateToScreen("LoggedMenu");
    } catch (error) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential') {
        Alert.alert("Error", "El correo electrónico o la contraseña son incorrectos.");
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, loading };
};
