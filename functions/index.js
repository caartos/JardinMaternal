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
const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteUserAccount = onCall(async (request) => {
  const {userId} = request.data;

  try {
    console.log("Datos recibidos en la función:", request.data);

    // Verifica que el userId no sea nulo o indefinido
    if (!userId) {
      throw new Error("El userId es requerido para eliminar un usuario.");
    }

    // Intenta eliminar al usuario de Firebase Authentication
    await admin.auth().deleteUser(userId);
    console.log(`Usuario con ID ${userId} eliminado de Authentication.`);
    return {success: true};
  } catch (error) {
    console.error("Error eliminando usuario de Authentication:", error);

    // Devuelve un error más detallado al cliente
    throw new Error(`No se pudo eliminar de Authentication: ${error.message}`);
  }
});
