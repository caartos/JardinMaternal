import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const useNotifications = (parentId) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!parentId) return;

    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("receptor", "==", parentId),
      where("isRead", "==", false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const parentNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(parentNotifications);
    });

    return () => unsubscribe(); // Limpia la suscripción al desmontar
  }, [parentId]);

  return notifications;
};

export default useNotifications;