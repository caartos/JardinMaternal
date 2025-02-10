import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { updateUser } from "../actions/userActions";
import { updateProfile } from "../config/auth";
import useNavigate from "../utils/navigation";

const useUpdateUser = (loggedUser) => {
  const navigateToScreen = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async (user) => {
    setLoading(true);
    try {
      const updatedUser = await updateProfile(loggedUser, user);
      dispatch(updateUser(updatedUser));
      Alert.alert("Perfil actualizado exitosamente.");
      navigateToScreen("LoggedMenu");
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateUser, loading };
};

export default useUpdateUser;