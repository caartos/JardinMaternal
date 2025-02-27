import {
  addDoc,
  serverTimestamp,
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const createCircular = async (circularData) => {
  try {
    await addDoc(collection(db, "circulares"), {
      ...circularData,
      timestamp: serverTimestamp(),
    });
    console.log("Circular creada exitosamente");
  } catch (error) {
    console.error("Error al crear la circular:", error);
    throw error;
  }
};

const fetchCirculars = async () => {
  try {
    const q = query(collection(db, "circulares"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const circularsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return circularsList;
  } catch (error) {
    console.error("Error al obtener las circulares:", error);
    throw error;
  }
};

const deleteCircular = async (id) => {
  try {
    await deleteDoc(doc(db, "circulares", id));
  } catch (error) {
    console.error("Error al eliminar la circular:", error);
    throw error;
  }
};

const updateCircular = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, "circulares", id), updatedData);
  } catch (error) {
    console.error("Error al actualizar la circular:", error);
    throw error;
  }
};

export { createCircular, fetchCirculars, deleteCircular, updateCircular };
