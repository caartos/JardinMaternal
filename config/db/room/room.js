import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const createRoomInDB = async (roomData) => {
  try {
    const docRef = await addDoc(collection(db, "rooms"), roomData);
    console.log("Sala creada con ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear la sala: ", error);
    throw error;
  }
};

const fetchAvailableRooms = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const roomsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return roomsList;
    } catch (error) {
      console.error("Error al obtener las aulas disponibles:", error);
      throw error;
    }
  };


export { createRoomInDB, fetchAvailableRooms };