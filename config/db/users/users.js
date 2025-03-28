import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const fetchTeachers = async () => {
    try {
        const q = query(collection(db, "users"), where("userType", "==", "MAESTRO"));
        const querySnapshot = await getDocs(q);

      const teachers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return teachers;
    } catch (error) {
      console.error("Error al obtener maestros desde la base de datos:", error);
      Alert.alert("Error", "No se pudieron cargar los maestros.");
    }
  };

  export { fetchTeachers };