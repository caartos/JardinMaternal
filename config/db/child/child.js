import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  writeBatch,
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

const fetchChildrenWithoutRoom = async () => {
  try {
    const q = query(collection(db, "childs"), where("roomId", "==", ""));
    const querySnapshot = await getDocs(q);
    const childrenList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return childrenList;
  } catch (error) {
    console.error("Error al obtener los niños sin sala:", error);
    throw error;
  }
}

const assignRoomToChild = async (childId, roomId) => {
  try {
    const childRef = doc(db, "childs", childId);
    await updateDoc(childRef, { roomId });
    console.log("Sala asignada exitosamente");
  } catch (error) {
    console.error("Error al asignar la sala:", error);
    throw error;
  }
};

const fetchChildrenByRoomId = async (roomId) => {
  try {
    const q = query(collection(db, "childs"), where("roomId", "==", roomId));
    const querySnapshot = await getDocs(q);
    const childrenList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return childrenList;
  } catch (error) {
    console.error("Error al obtener los niños por roomId:", error);
    throw error;
  }
};

const removeChildFromRoom = async (childId) => {
  try {
    const childRef = doc(db, "childs", childId);
    await updateDoc(childRef, { roomId: "" });
    console.log("Alumno removido del aula exitosamente");
  } catch (error) {
    console.error("Error al remover al alumno del aula:", error);
    throw error;
  }
};

const removeAllChildrenFromRoom = async (roomId) => {
  try {
    // Consulta para obtener todos los niños con el roomId especificado
    const q = query(collection(db, "childs"), where("roomId", "==", roomId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No hay niños en esta sala.");
      return;
    }

    // Usar un batch para actualizar múltiples documentos
    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
      const childRef = doc.ref; // Obtener la referencia del documento
      batch.update(childRef, { roomId: "" }); // Actualizar el roomId a ""
    });

    // Confirmar las actualizaciones en Firestore
    await batch.commit();
    console.log("Todos los niños han sido removidos del aula exitosamente.");
  } catch (error) {
    console.error("Error al remover a todos los niños del aula:", error);
    throw error;
  }
};

export { createChildInDB, fetchUserChildren, updateChildInDB, fetchChildrenWithoutRoom, assignRoomToChild, fetchChildrenByRoomId, removeChildFromRoom, removeAllChildrenFromRoom };
