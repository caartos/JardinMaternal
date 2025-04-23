import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const useMultimediaPicker = (uploadMediaToFirestore) => {
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [isPicking, setIsPicking] = useState(false);
  
    const pickAndUploadMedia = async (room, updateSelectedRoom) => {
      try {
        setIsPicking(true);
        // Abrir la galería para seleccionar imágenes/videos
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsMultipleSelection: true,
        selectionLimit: 10,
        quality: 1,
      });

      if (!result.canceled) {
        const elementsUris = result.assets.map((asset) => asset.uri);
        setSelectedMedia(elementsUris);

        // Subir los medios seleccionados a Firestore
        await uploadMediaToFirestore(elementsUris, room, updateSelectedRoom);
      }
    } catch (error) {
      console.error("Error al seleccionar o subir medios:", error);
    } finally {
      setIsPicking(false);
    }
  };

  return { pickAndUploadMedia, selectedMedia, isPicking };
};

export default useMultimediaPicker;
