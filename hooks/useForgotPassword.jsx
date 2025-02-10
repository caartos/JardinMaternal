import { useState } from "react";
import { Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (mail) => {
    if (!mail) {
      Alert.alert("Error", "Por favor, ingrese su correo electrónico.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, mail.toLowerCase());
      Alert.alert(
        "Éxito",
        "Chequea tu casilla de mail para restablecer tu contraseña."
      );
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "El correo electrónico no está registrado.");
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPassword, loading };
};

export default useForgotPassword;