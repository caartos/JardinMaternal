import { useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { markNotificationsAsRead } from "../config/db/notifications/notifications";
import { useIsFocused } from "@react-navigation/native";

const useMarkNotificationsAsRead = (userType, childId, notificationType, parentId) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if ( isFocused) {
      const notificationsRef = collection(db, "notifications");
      const q = query(
        notificationsRef,
        where("childId", "==", childId),
        where("receptor", "==", parentId),
        where("type", "==", notificationType),
        where("isRead", "==", false)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          markNotificationsAsRead(userType, childId, notificationType, parentId);
        }
      });

      return () => unsubscribe(); // Limpiar la suscripción al desmontar
    }
  }, [userType, childId, notificationType, isFocused, parentId]);
};

export default useMarkNotificationsAsRead;