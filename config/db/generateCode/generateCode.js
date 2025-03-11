import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const generateCode = (codeType) => {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${codeType}${code}`;
};

const createCode = async (codeType) => {
  const code = generateCode(codeType);
  const expirationTime = Timestamp.fromDate(new Date(Date.now() + 15 * 60 * 1000)); // 15 minutos desde que se crea

  await addDoc(collection(db, "codes"), {
    code,
    expirationTime,
    used: false,
  });

  return code;
};

export { createCode };