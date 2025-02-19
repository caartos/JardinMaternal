import { useState } from "react";
import { Alert } from "react-native";
import { signUp } from "../config/auth";
import useNavigate from "../utils/navigation";

const useSignUp = () => {
  const navigateToScreen = useNavigate();
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignUp = async (newUser) => {
    const requiredFields = [
      "nombre",
      "apellido",
      "telefono1",
      "dni",
      "mail",
      "contraseña",
    ];

    const missingFields = requiredFields.filter((field) => !newUser[field]);
    if (missingFields.length > 0) {
      Alert.alert("Por favor, complete todos los campos obligatorios.");
      return
    }

    const emailVerification = () => {
      if (!emailRegex.test(newUser.mail)) {
        Alert.alert("Dirección de correo electrónico inválida");
        return false
      }
      return true;
    };

    if (!emailVerification()) {
      return;
    }


    setLoading(true);
    try {
      const mail = newUser.mail.toLowerCase();
      await signUp(mail, newUser.contraseña, {
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        telefono1: newUser.telefono1,
        telefono2: newUser.telefono2,
        dni: newUser.dni,
        mail: mail,
      });

      Alert.alert("Registro exitoso.");
      navigateToScreen("Main");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "El correo electrónico ya está en uso.");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "Dirección de correo electrónico inválida");
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignUp, loading };
};

export default useSignUp;
