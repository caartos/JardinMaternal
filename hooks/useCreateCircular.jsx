import { Alert } from "react-native";
import { createCircular } from "../config/db/circular/createCircular";

const useCreateCircular = () => {
  const createCircularHandler = async (circular, loggedUser, aula, setCircular) => {
    if (!circular.titulo || !circular.circular) {
      Alert.alert("Error", "Por favor, complete ambos campos.");
      return;
    }

    try {
      const cargo = loggedUser.userType === "ADMIN" ? "Directora" : "Seño";
      const destinatario = loggedUser.userType === "ADMIN" ? "Todos" : aula;

      await createCircular({
        titulo: circular.titulo,
        circular: circular.circular,
        nombre: loggedUser.nombre,
        cargo: cargo,
        idSender: loggedUser.uid,
        nameSender: loggedUser.nombre,
        destinatario: destinatario,
      });

      Alert.alert("Éxito", "Circular creada exitosamente.");
      setCircular({ titulo: "", circular: "" }); // Limpiar los campos después de crear la circular
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la circular.");
      console.error("Error al crear la circular:", error);
    }
  };

  return { createCircularHandler };
};

export default useCreateCircular;