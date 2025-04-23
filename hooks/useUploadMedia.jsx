import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { uploadMediaToFirestorage } from "../config/db/room/room";

const useUploadMedia = () => {
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();
  
    const uploadMediaToFirestore = async (mediaUris, room, updateSelectedRoom) => {
      try {
        setIsUploading(true);
  
        // Llamar a la función para subir y guardar en Firestore
        const uploadedUrls = await uploadMediaToFirestorage(mediaUris, room);
  
        // Actualizar el estado global con Redux
        dispatch(
          updateSelectedRoom({
            multimedia: room.multimedia
              ? [...room.multimedia, ...uploadedUrls]
              : uploadedUrls,
          })
        );
  
        Alert.alert("Éxito", "Imágenes/videos subidos correctamente.");
      } catch (error) {
        console.error("Error al subir multimedia:", error);
        Alert.alert("Error", "No se pudo subir la multimedia.");
      } finally {
        setIsUploading(false);
      }
    };
  
    return { uploadMediaToFirestore, isUploading };
  };

export default useUploadMedia;
