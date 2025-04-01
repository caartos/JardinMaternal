import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  arrayUnion,
  getDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, functions } from "../../firebaseConfig";
import { Alert } from "react-native";
import { httpsCallable } from "firebase/functions";

const fetchTeachers = (callback, errorCallback) => {
  try {
    const q = query(
      collection(db, "users"),
      where("userType", "==", "MAESTRO") // Filtra solo los usuarios tipo "MAESTRO"
    );

    // Establece una suscripción en tiempo real
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const teachers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(teachers); // Llama al callback con los datos obtenidos
      },
      (error) => {
        console.error("Error al cargar los maestros:", error);
        if (errorCallback) errorCallback(error); // Llama al callback de error si existe
      }
    );

    return unsubscribe; // Devuelve la función de limpieza
  } catch (error) {
    console.error("Error al configurar la suscripción de maestros:", error);
    throw error;
  }
};

const assignRoomToTeacher = async (teacherId, roomId) => {
  try {
    const teacherRef = doc(db, "users", teacherId);
    const teacherDoc = await getDoc(teacherRef);

    if (teacherDoc.exists()) {
      const teacherData = teacherDoc.data();

      // Verifica si el roomId ya está en el array rooms
      if (teacherData.rooms && teacherData.rooms.includes(roomId)) {
        Alert.alert("Error", "Esta maestra ya tiene esta sala asignada.");
        return;
      }

      // Si no está, agrega el roomId al array rooms
      await updateDoc(teacherRef, {
        rooms: arrayUnion(roomId),
      });
      Alert.alert("Sala agregada exitosamente");
      console.log("Sala asignada exitosamente");
    } else {
      console.error("El documento del maestro no existe.");
      Alert.alert("Error", "No se encontró el maestro.");
    }
  } catch (error) {
    console.error("Error al asignar la sala:", error);
    throw error;
  }
};

const fetchTeachersByRoomId = async (roomId) => {
  try {
    const q = query(
      collection(db, "users"),
      where("userType", "==", "MAESTRO"), // Filtra solo los usuarios tipo "MAESTRO"
      where("rooms", "array-contains", roomId) // Busca maestras que tengan el roomId en su array de rooms
    );

    const querySnapshot = await getDocs(q);

    const teachers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return teachers;
  } catch (error) {
    console.error("Error al obtener maestras por roomId:", error);
    throw error;
  }
};

const deleteTeacher = async (teacherId) => {
  console.log("MAESTRA ID en userjs", teacherId);

  try {
    // Llama a la Cloud Function para eliminar al usuario de Authentication
    const deleteUserAccount = httpsCallable(functions, "deleteUserAccount");
    await deleteUserAccount({ userId: teacherId });
    console.log(`Usuario con ID ${teacherId} eliminado de Authentication.`);

    // Elimina al usuario de Firestore
    const userRef = doc(db, "users", teacherId);
    await deleteDoc(userRef);
    console.log(`Usuario con ID ${teacherId} eliminado de Firestore.`);
  } catch (error) {
    console.error("Error al eliminar al maestro:", error);
    throw error;
  }
};


export { fetchTeachers, assignRoomToTeacher, fetchTeachersByRoomId, deleteTeacher };
