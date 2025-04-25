/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const { onCall } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.deleteUserAccount = onCall(async (request) => {
  const { userId } = request.data;

  try {
    console.log("Datos recibidos en la función:", request.data);

    // Verifica que el userId no sea nulo o indefinido
    if (!userId) {
      throw new Error("El userId es requerido para eliminar un usuario.");
    }

    // Intenta eliminar al usuario de Firebase Authentication
    await admin.auth().deleteUser(userId);
    console.log(`Usuario con ID ${userId} eliminado de Authentication.`);
    return { success: true };
  } catch (error) {
    console.error("Error eliminando usuario de Authentication:", error);

    // Devuelve un error más detallado al cliente
    throw new Error(`No se pudo eliminar de Authentication: ${error.message}`);
  }
});

exports.cleanExpiredObservations = onSchedule("0 0 * * *", async () => {
  try {
    const now = admin.firestore.Timestamp.now();

    // Obtén todos los documentos de la colección "childs"
    const childrenSnapshot = await db.collection("childs").get();

    const batch = db.batch();

    childrenSnapshot.forEach((doc) => {
      const data = doc.data();

      // Verifica si las observaciones han expirado
      if (
        data.observaciones &&
        data.observaciones.createdAt &&
        data.observaciones.createdAt.toMillis() < now.toMillis()
      ) {
        const childRef = db.collection("childs").doc(doc.id);
        // Limpia las observaciones
        batch.update(childRef, {
          observaciones: {
            siesta: "",
            baño: "",
            merienda: "",
            comentarios: "",
            createdAt: null,
          },
        });
      }
    });

    // Ejecuta el batch
    await batch.commit();
    console.log("Observaciones expiradas limpiadas correctamente.");
  } catch (error) {
    console.error("Error al limpiar observaciones expiradas:", error);
  }
});