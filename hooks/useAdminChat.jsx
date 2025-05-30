import { useEffect, useState, useRef } from "react";
//import firestore from "@react-native-firebase/firestore";
import { db } from "../config/firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

const useAdminChat = (userId, parentId, sendBy, childId, notificationType) => {
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const chatId = `${sendBy}${parentId}`; // Formato del chatId

  useEffect(() => {
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

    return () => unsubscribe(); // Limpia la suscripción al desmontar
  }, [parentId]);

  const sendMessage = async (newMessage) => {
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "chats"), {
      text: newMessage,
      sender: userId,
      participants: [userId, parentId],
      chatId,
      timestamp: serverTimestamp(),
    });

    // Crear una notificación para el padre
    await addDoc(collection(db, "notifications"), {
      childId,
      receptor: parentId,
      type: notificationType, // Tipo de notificación
      message: "Nuevo mensaje de la maestra.",
      timestamp: serverTimestamp(),
      isRead: false, // Marca la notificación como no leída
    });
  };

  return { messages, sendMessage, flatListRef };
};

//   const sendMessage = async (message, admin) => {
//     if (!message.trim()) return;

//     const chatId = `directora_${parentId}`;
//     await firestore()
//       .collection("chats")
//       .doc(chatId)
//       .collection("messages")
//       .add({
//         text: message,
//         senderId: admin.id,
//         senderName: admin.nombre,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       });
//   };

//   return { messages, sendMessage };
// };

export default useAdminChat;
