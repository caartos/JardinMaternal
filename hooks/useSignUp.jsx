import { useState } from "react";
import { Alert } from "react-native";
import { signUp } from "../config/auth";
import useNavigate from "../utils/navigation";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { is } from "date-fns/locale";

const useSignUp = () => {
  const navigateToScreen = useNavigate();
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignUp = async (newUser) => {
    const requiredFields = [
      "codigo",
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
      return;
    }

    const emailVerification = () => {
      if (!emailRegex.test(newUser.mail)) {
        Alert.alert("Dirección de correo electrónico inválida");
        return false;
      }
      return true;
    };

    if (!emailVerification()) {
      return;
    }

    setLoading(true);
    try {
      const mail = newUser.mail.toLowerCase();
      let userType 
      let isAdmin

      // Verificar el código
      const q = query(collection(db, "codes"), where("code", "==", newUser.codigo), where("used", "==", false));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Código inválido o ya utilizado.");
        setLoading(false);
        return;
      }

      const codeDoc = querySnapshot.docs[0];
      const codeData = codeDoc.data();

      if (codeData.expirationTime.toDate() < new Date()) {
        Alert.alert("El código ha expirado.");
        setLoading(false);
        return;
      }

      // Determinar el tipo de usuario basado en el código
      if (newUser.codigo === "ADMIN7713*") {
        userType = "ADMIN";
      } else if (newUser.codigo.startsWith("alumno")) {
        userType = "PADRE";
      } else if (newUser.codigo.startsWith("maestro")) {
        userType = "MAESTRO";
      } else {
        Alert.alert("Código inválido.");
        setLoading(false);
        return;
      }

      if( userType === "ADMIN"){
        isAdmin = true;
      }else{
        isAdmin = false;
      }
      // Marcar el código como utilizado
      await updateDoc(doc(db, "codes", codeDoc.id), { used: true });

      await signUp(mail, newUser.contraseña, {
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        telefono1: newUser.telefono1,
        telefono2: newUser.telefono2,
        dni: newUser.dni,
        mail: mail,
        userType: userType,
        admin: isAdmin,
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
