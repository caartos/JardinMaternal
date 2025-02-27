import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

// Función para agregar un niño a la colección "childs"
const createChildInDB = async (childData) => {
  try {
    const docRef = await addDoc(collection(db, "childs"), {
      ...childData,
      timestamp: serverTimestamp(),
    });

    const childWithId = { ...childData, id: docRef.id }; // Agregar el ID generado
    console.log("Niño agregado con ID:", docRef.id);
    return childWithId; // Retornar el niño con ID
  } catch (error) {
    console.error("Error al agregar el niño:", error);
    throw error;
  }
};

export default createChildInDB;

const fetchUserChildren = async (userId) => {
  try {
    const q = query(
      collection(db, "childs"),
      where("parentId", "==", userId) || where("parentId2", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const childrenList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return childrenList;
  } catch (error) {
    console.error("Error al obtener los hijos del usuario:", error);
    throw error;
  }
};

const updateChildInDB = async (childId, updatedData) => {
  try {
    const childRef = doc(db, "childs", childId);
    await updateDoc(childRef, updatedData);
    console.log("Niño actualizado exitosamente");
  } catch (error) {
    console.error("Error al actualizar el niño:", error);
    throw error;
  }
};

export { createChildInDB, fetchUserChildren, updateChildInDB };
