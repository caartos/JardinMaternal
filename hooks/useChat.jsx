import { useState, useEffect, useRef } from "react";
import { collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const generateChatId = (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };

const useChat = (user, chatWith) => {
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
  };

  return { messages, sendMessage, flatListRef };
};

export default useChat;
