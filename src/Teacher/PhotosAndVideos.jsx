import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  Modal,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {Video} from "expo-av"; // Importar react-native-video
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import titlesStyles from "../../styles/commons/titlesStyles";
import buttonStyles from "../../styles/button/buttonStyles";
import Button from "../../components/Buttons/Button";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../config/firebaseConfig";
import { updateSelectedRoom } from "../../reducers/roomReducer";

const PhotosAndVideos = ({ route }) => {
  const { backButtonDestiny } = route.params;
  const user = useSelector((state) => state.user.user);
  const room = useSelector((state) => state.room.selectedRoom);

  const dispatch = useDispatch();
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedMediaUri, setSelectedMediaUri] = useState(null); // Para la imagen o video en tamaño completo
  const [isModalVisible, setIsModalVisible] = useState(false); // Controla el modal

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 10,
    });
    if (!result.canceled) {
      const elementsUris = result.assets.map((asset) => asset.uri);
      setSelectedMedia(elementsUris);
      await uploadMediaToFirestore(elementsUris);
    }
  };

  const uploadMediaToFirestore = async (mediaUris) => {
    if (!room || !room.id) {
      Alert.alert("Error", "No se encontró la sala seleccionada.");
      return;
    }
  
    try {
      const storage = getStorage();
      const uploadedUrls = [];
  
      for (const uri of mediaUris) {
        const response = await fetch(uri);
        const blob = await response.blob();
  
        const fileName = uri.split("/").pop();
        const storageRef = ref(
          storage,
          `rooms/${room.id}/multimedia/${fileName}`
        );
  
        // Determinar el tipo MIME del archivo
        const metadata = {
          contentType: blob.type, // Esto agrega el tipo MIME automáticamente
        };
  
        await uploadBytes(storageRef, blob, metadata);
  
        const downloadUrl = await getDownloadURL(storageRef);
        uploadedUrls.push({ url: downloadUrl, type: blob.type }); // Guardar la URL y el tipo MIME
      }
  
      const roomRef = doc(db, "rooms", room.id);
      const roomDoc = await getDoc(roomRef);
  
      if (!roomDoc.exists()) {
        await setDoc(roomRef, { multimedia: uploadedUrls });
      } else {
        await updateDoc(roomRef, {
          multimedia: arrayUnion(...uploadedUrls),
        });
      }
  
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
    }
  };

  const handleMediaPress = (media) => {
    
    setSelectedMediaUri(media);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMediaUri(null);
  };

  const isVideo = (media) => {
    console.log("video",media)
    return media.type.startsWith("video/");
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <View style={registerStyles.photosAndVideosMainViewTag}>
        <LoggedOutHeader
          title={"Imagenes y Videos"}
          backButtonDestiny={backButtonDestiny}
        />
        {user?.userType !== "PADRE" && (
          <Button
            buttonRegularStyle={buttonStyles.createCircularButtonStyle}
            titleStyle={buttonStyles.createCircularTextButtonStyle}
            title={"Agregar imagen/video"}
            onPress={handleImagePick}
          />
        )}
        <Text style={titlesStyles.childList}>Multimedia:</Text>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {room?.multimedia && room.multimedia.length > 0 ? (
            room.multimedia.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleMediaPress(item)}
              >
                {isVideo(item) ? (
                  <Video
                    source={{ uri: item.url }}
                    style={{
                      width: 100,
                      height: 100,
                      margin: 5,
                      borderRadius: 10,
                    }}
                    resizeMode="cover"
                    useNativeControls={false} // No reproducir automáticamente
                  />
                ) : (
                  <Image
                    source={{ uri: item.url }}
                    style={{
                      width: 100,
                      height: 100,
                      margin: 5,
                      borderRadius: 10,
                    }}
                  />
                )}
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              No hay multimedia disponible.
            </Text>
          )}
        </ScrollView>
        <Modal visible={isModalVisible} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={closeModal}
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selectedMediaUri && isVideo(selectedMediaUri) ? (
                <Video
                source={{ uri: selectedMediaUri?.url }}
                style={{
                  width: "90%",
                  height: "70%",
                }}
                resizeMode="cover"
                useNativeControls // Mostrar controles para reproducir/pausar
                
                shouldPlay
                onError={(error) => console.error("Error al cargar el video:", error)}
              />
              ) : (
                <Image
                  source={{ uri: selectedMediaUri?.url }}
                  style={{
                    width: "90%",
                    height: "70%",
                    resizeMode: "contain",
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default PhotosAndVideos;
