import { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { markNotificationsAsRead } from "../config/db/notifications/notifications";

const generateChatId = (uid1, uid2) => {
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
};

const useChat = (user, chatWith, childId, notificationType, room) => {
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);
  useEffect(() => {
    if (!user || !chatWith) return;

    const chatId = generateChatId(user.uid, chatWith);

    const q = query(
      collection(db, "chats"),
      where("chatId", "==", chatId),
      //where("participants", "array-contains", user.uid),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
    });

    if (childId && notificationType) {
      markNotificationsAsRead(childId, notificationType);
    }

    return () => unsubscribe();
  }, [user, chatWith]);

  const sendMessage = async (newMessage) => {
    if (newMessage.trim() === "") return;

    const chatId = generateChatId(user.uid, chatWith);

    await addDoc(collection(db, "chats"), {
      text: newMessage,
      sender: user.uid,
      participants: [user.uid, chatWith],
      chatId,
      timestamp: serverTimestamp(),
    });

    if (notificationType === "teacherChat") {
    // Obtener las maestras de la room
   
    if (room) {
      const teachersId = room.teachersId || [];
      // Enviar notificación a cada maestra
      await Promise.all(
        teachersId.map((teacherId) =>
          addDoc(collection(db, "notifications"), {
            childId,
            receptor: teacherId,
            type: notificationType,
            message: "Nuevo mensaje del padre.",
            timestamp: serverTimestamp(),
            isRead: false,
          })
        )
      );
    }
  } else if (notificationType === "directorChat") {
    
    const directora = "directora"; // TRABAJAR PARA QUE ACA LLEGUE EL ID DE LA DIRECTORA
    await addDoc(collection(db, "notifications"), {
      childId,
      receptor: directora,
      type: notificationType,
      message: "Nuevo mensaje del padre.",
      timestamp: serverTimestamp(),
      isRead: false,
    });
  }
  }
  return { messages, sendMessage, flatListRef };
};

export default useChat;
