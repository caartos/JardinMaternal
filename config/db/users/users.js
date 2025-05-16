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
  arrayRemove,
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
  if (!roomId) {
    Alert.alert("Error", "Necesitas seleccionar una sala.");
    return;
  }
  try {
    // Referencia al documento del maestro
    const teacherRef = doc(db, "users", teacherId);
    const teacherDoc = await getDoc(teacherRef);

    if (teacherDoc.exists()) {
      const teacherData = teacherDoc.data();

      // Verifica si el roomId ya está en el array rooms del maestro
      if (teacherData.rooms && teacherData.rooms.includes(roomId)) {
        Alert.alert("Error", "Esta maestra ya tiene esta sala asignada.");
        return;
      }

      // Agrega el roomId al array rooms del maestro
      await updateDoc(teacherRef, {
        rooms: arrayUnion(roomId),
      });

      // Referencia al documento de la sala
      const roomRef = doc(db, "rooms", roomId);
      const roomDoc = await getDoc(roomRef);

      if (roomDoc.exists()) {
        const roomData = roomDoc.data();

        // Verifica si el teacherId ya está en el array teachersId de la sala
        if (roomData.teachersId && roomData.teachersId.includes(teacherId)) {
          Alert.alert("Error", "Esta sala ya tiene asignada a esta maestra.");
          return;
        }

        // Agrega el teacherId al array teachersId de la sala
        await updateDoc(roomRef, {
          teachersId: arrayUnion(teacherId),
        });

        Alert.alert("Sala asignada exitosamente");
        console.log("Sala asignadas exitosamente");
      } else {
        console.error("El documento de la sala no existe.");
        Alert.alert("Error", "No se encontró la sala.");
      }
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

const removeRoomFromTeacher = async (teacherId, roomId) => {
  try {
    const teacherRef = doc(db, "users", teacherId);
    await updateDoc(teacherRef, {
      rooms: arrayRemove(roomId), // Elimina el roomId del array de rooms
    });
    console.log(`Room ${roomId} eliminado del maestro ${teacherId}`);
    const roomRef = doc(db, "rooms", roomId);

    // Elimina el teacherId del array de teachersId de la sala
    await updateDoc(roomRef, {
      teachersId: arrayRemove(teacherId),
    });
    console.log(`Teacher ${teacherId} eliminado de la sala ${roomId}`);
  } catch (error) {
    console.error("Error al eliminar el room del maestro:", error);
    throw error;
  }
};

const fetchUserNotifications = async (parentId) => {
  try {
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("receptor", "==", parentId),
      where("isRead", "==", false)
    );
    const snapshot = await getDocs(q);

    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export {
  fetchTeachers,
  assignRoomToTeacher,
  fetchTeachersByRoomId,
  deleteTeacher,
  removeRoomFromTeacher,
  fetchUserNotifications,
};
