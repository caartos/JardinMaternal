import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { deleteUser as deleteAuthUser } from "firebase/auth";

// Función para registrar usuarios
const signUp = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    console.log("Registro exitoso: UID", userId);

    // Guardar datos en Firestore
    await setDoc(doc(db, "users", userId), userData);
    console.log("Datos guardados en Firestore");

    return userCredential;
  } catch (error) {
    console.error("Error en el registro:", error.message);
    throw error;
  }
};

//Función para iniciar sesión
const signIn = async (email, password) => {
  try {
    // Authenticate the user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userEmail = userCredential.user.email;

    // Retrieve user data from Firestore
    const q = query(collection(db, "users"), where("mail", "==", userEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      userData.uid = userCredential.user.uid;
      return { userCredential, userData };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};

// Función para actualizar el perfil de un usuario
const updateProfile = async (user, userData) => {
  let imageUrl = userData.profileImage;
  try {
    // Subir imagen si es nueva
    if (
      userData.profileImage &&
      !userData.profileImage.startsWith("https://")
    ) {
      const response = await fetch(userData.profileImage);
      const blob = await response.blob();
      const storage = getStorage();
      const storageRef = ref(storage, `profileImages/${user.uid}`);

      await uploadBytes(storageRef, blob);
      imageUrl = await getDownloadURL(storageRef);
    }

    // Guardar en Firestore
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      nombre: userData.nombre,
      apellido: userData.apellido,
      telefono1: userData.telefono1,
      telefono2: userData.telefono2,
      dni: userData.dni,
      mail: userData.mail,
      profileImage: imageUrl,
      hijos: userData.hijos || [],
    });

    // Cambiar contraseña si se proporciona una nueva
    if (userData.contraseña) {
      const authInstance = getAuth();
      const currentUser = authInstance.currentUser;
      await updatePassword(currentUser, userData.contraseña);
    }

    return { ...userData, profileImage: imageUrl }; // Devuelve los datos actualizados
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    throw error;
  }
};

const updateChildProfile = async (user, childData) => {
  let imageUrl = childData.profileImage;
  try {
    // Subir imagen si es nueva
    if (
      childData.profileImage &&
      !childData.profileImage.startsWith("https://")
    ) {
      const response = await fetch(childData.profileImage);
      const blob = await response.blob();
      const storage = getStorage();
      const storageRef = ref(storage, `childImages/${childData.dni}`);

      await uploadBytes(storageRef, blob);
      imageUrl = await getDownloadURL(storageRef);
    }

    // Actualizar el perfil del niño en Firestore
    let updatedHijos;
    if (user.hijos && user.hijos.length > 0) {
      const hijoExistente = user.hijos.find(
        (hijo) => hijo.dni === childData.dni
      );
      if (hijoExistente) {
        updatedHijos = user.hijos.map((hijo) =>
          hijo.dni === childData.dni
            ? { ...childData, profileImage: imageUrl }
            : hijo
        );
      } else {
        updatedHijos = [
          ...user.hijos,
          { ...childData, profileImage: imageUrl },
        ];
      }
    } else {
      updatedHijos = [{ ...childData, profileImage: imageUrl }];
    }

    const updatedUser = {
      ...user,
      hijos: updatedHijos,
    };

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, updatedUser);

    return updatedUser; // Devuelve los datos actualizados
  } catch (error) {
    console.error("Error al actualizar perfil sdel niño:", error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    // Eliminar al usuario de Firestore
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
    console.log(`Usuario con ID ${userId} eliminado de Firestore.`);
    console.log("ESTOY EN AUTH", userId);
    // Eliminar al usuario de Firebase Authentication
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.uid === userId) {
      await deleteAuthUser(currentUser);
      console.log(`Usuario con ID ${userId} eliminado de Authentication.`);
    } else {
      throw new Error(
        "No se puede eliminar el usuario de Authentication. Asegúrate de que el usuario esté autenticado."
      );
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};


// Exportamos las funciones
export { signUp, signIn, updateProfile, updateChildProfile, deleteUser };
