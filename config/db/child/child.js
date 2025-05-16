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
  Timestamp,
  setDoc,
  getDoc,
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

// Función para crear o actualizar observaciones con expiración
const saveChildObservations = async (childId, observaciones) => {
  try {
    // Asegúrate de que `expirationTime` sea un objeto Date
    const now = Timestamp.fromDate(new Date());
    const childRef = doc(db, "childs", childId); // Referencia al documento del niño
    await setDoc(
      childRef,
      {
        observaciones: {
          ...observaciones,
          createdAt: now, // Agrega el tiempo de expiración
        },
      },
      { merge: true } // Combina con los datos existentes
    );

    console.log("Observaciones guardadas exitosamente para el niño:", childId);
  } catch (error) {
    console.error("Error al guardar las observaciones:", error);
    throw error; // Lanza el error para que pueda ser manejado por el componente que llama esta función
  }
};

// Función para obtener observaciones y verificar expiración
const getChildObservations = async (childId) => {
  try {
    const childRef = doc(db, "childs", childId);
    const childDoc = await getDoc(childRef);

    if (childDoc.exists()) {
      const data = childDoc.data();
      const now = Timestamp.now();

      // Verifica si las observaciones han expirado
      if (data.observaciones?.expiresAt && data.observaciones.expiresAt.toMillis() < now.toMillis()) {
        console.log("Las observaciones han expirado para el niño:", childId);
        return {
          siesta: "",
          baño: "",
          merienda: "",
          comentarios: "",
        };
      }

      return data.observaciones || {};
    } else {
      console.log("No se encontró el documento del niño:", childId);
      return {};
    }
  } catch (error) {
    console.error("Error al obtener las observaciones:", error);
    throw error; // Lanza el error para que pueda ser manejado por el componente que llama esta función
  }
};

export { createChildInDB, fetchUserChildren, updateChildInDB, fetchChildrenWithoutRoom, assignRoomToChild, fetchChildrenByRoomId, removeChildFromRoom, removeAllChildrenFromRoom, saveChildObservations, getChildObservations };
