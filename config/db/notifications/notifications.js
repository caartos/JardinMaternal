import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const markNotificationsAsRead = async (userType, childId, type, receptor) => {
  const notificationsRef = collection(db, "notifications");
  const q = query(
    notificationsRef,
    where("childId", "==", childId),
    where("receptor", "==", receptor),
    where("type", "==", type),
    where("isRead", "==", false)
  );
  console.log("Querying notifications:", q);
  const snapshot = await getDocs(q);
  // Si no hay notificaciones no leídas, salir de la función
  if (snapshot.empty) {
    return;
  }
  console.log("Documentos encontrados:", snapshot.docs.map((doc) => doc.data()));

  const batch = writeBatch(db); // Crear un batch para operaciones en lote

  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, { isRead: true }); // Agregar la actualización al batch
  });

  // Ejecutar todas las actualizaciones en Firestore
  await batch.commit();
};

export { markNotificationsAsRead };