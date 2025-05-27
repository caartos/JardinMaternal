import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { db } from "../../config/firebaseConfig";
import { markNotificationsAsRead } from "../../config/db/notifications/notifications";

const ChildCommentsView = ({ childId, userId, userType }) => {

  const [childObservations, setChildObservations] = useState({});

  useEffect(() => {
    const childDocRef = doc(db, "childs", childId); // Asegúrate de que la colección sea correcta
    const unsubscribe = onSnapshot(
      childDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setChildObservations(snapshot.data().observaciones || {});

          markNotificationsAsRead(userType, childId, "observaciones", userId);
        } else {
          console.warn("No se encontraron observaciones para este niño.");
        }
      },
      (error) => {
        console.error("Error al escuchar las observaciones:", error);
      }
    );

    return () => unsubscribe(); // Limpia el listener al desmontar
  }, [childId, userId]);

  return (
    <View
      style={{
        backgroundColor: "white",
        width: "80%",
        borderRadius: 10,
        padding: 10,
        alignSelf: "center",
        marginBottom: 20,
      }}
    >
      <Text style={{ padding: 5, fontWeight: "bold", fontSize: 17 }}>
        Comentarios:
      </Text>
      <Text style={{ paddingLeft: 10, padding: 5, fontSize: 15 }}>
        Siesta: {childObservations.siesta || ""}
      </Text>
      <Text style={{ paddingLeft: 10, padding: 5, fontSize: 15 }}>
      Baño: {childObservations.baño ? `${childObservations.baño} 💩` : ""}
      </Text>
      <Text style={{ paddingLeft: 10, padding: 5, fontSize: 15 }}>
        Merienda: {childObservations.merienda || ""}
      </Text>
      <Text style={{ paddingLeft: 10, padding: 5, fontSize: 15 }}>
        Comentarios: {childObservations.comentarios || ""}
      </Text>
    </View>
  );
};

export default ChildCommentsView;
