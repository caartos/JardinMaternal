import { useEffect, useState, useRef } from "react";
//import firestore from "@react-native-firebase/firestore";
import { db } from "../config/firebaseConfig";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";

const useAdminChat = (user, parentId) => {
    console.log("parentId", parentId)
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const chatId = `directora_${parentId}`; // Formato del chatId
  console.log(chatId)
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
    // const unsubscribe = firestore()
    //   .collection("chats")
    //   .doc(chatId)
    //   .collection("messages")
    //   .orderBy("createdAt", "asc")
    //   .onSnapshot((snapshot) => {
    //     const fetchedMessages = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setMessages(fetchedMessages);
    //   });

    return () => unsubscribe(); // Limpia la suscripción al desmontar
  }, [parentId]);

  const sendMessage = async (newMessage) => {
      if (newMessage.trim() === "") return;
  
      await addDoc(collection(db, "chats"), {
        text: newMessage,
        sender: user.uid,
        participants: [user.uid, parentId],
        chatId,
        timestamp: serverTimestamp(),
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