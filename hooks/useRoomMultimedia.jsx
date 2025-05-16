import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const useRoomMultimedia = (roomId) => {
  const [multimedia, setMultimedia] = useState([]);

  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, "rooms", roomId);

      const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const roomData = docSnapshot.data();
          setMultimedia(roomData.multimedia || []); // Actualizar multimedia en tiempo real
        }
      });

      return () => unsubscribe(); // Limpiar la suscripción al desmontar
    }
  }, [roomId]);

  return multimedia;
};

export default useRoomMultimedia;