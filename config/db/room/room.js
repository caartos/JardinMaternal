import { collection, addDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";
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

  const fetchRoomById = async (roomId) => {
    try {
      // Referencia directa al documento por su ID
      const roomRef = doc(db, "rooms", roomId);
      const roomDoc = await getDoc(roomRef);
  
      if (roomDoc.exists()) {
        return { id: roomDoc.id, ...roomDoc.data() }; // Devuelve el documento como un objeto
      } else {
        console.error(`No se encontró la sala con ID: ${roomId}`);
        return null; // Devuelve null si no existe
      }
    } catch (error) {
      console.error("Error al obtener la sala:", error);
      throw error;
    }
  };

  const fetchTeachersRoom = async (teacherId) => {
    try {
      const roomsRef = collection(db, "rooms");
      const q = query(roomsRef, where("teachersId", "array-contains", teacherId));
      const querySnapshot = await getDocs(q);
      const roomsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return roomsList;
    } catch (error) {
      console.error("Error al obtener las salas del maestro:", error);
      throw error;
    }
  };


export { createRoomInDB, fetchAvailableRooms, fetchTeachersRoom, fetchRoomById };