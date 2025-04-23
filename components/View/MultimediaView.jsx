import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from "react-native";
import { Video } from "expo-av";
import titlesStyles from "../../styles/commons/titlesStyles";
import modalSelectorStyles from "../../styles/commons/modalSelectorStyles";
import buttonStyles from "../../styles/button/buttonStyles";

const MultimediaView = ({ multimedia }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMediaUri, setSelectedMediaUri] = useState(null);

  const isVideo = (media) => {
    console.log("video", media);
    return media.type.startsWith("video/");
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMediaUri(null);
  };

  const handleMediaPress = (media) => {
    setSelectedMediaUri(media);
    setIsModalVisible(true);
  };

  return (
    <>
      <Text style={titlesStyles.childList}>Multimedia:</Text>
      <ScrollView
        contentContainerStyle={modalSelectorStyles.multimediaScrollView}
      >
        {multimedia && multimedia.length > 0 ? (
          multimedia.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMediaPress(item)}
            >
              {isVideo(item) ? (
                <Video
                  source={{ uri: item.url }}
                  style={modalSelectorStyles.imageAndVideoMini}
                  resizeMode="cover"
                  useNativeControls={false} // No reproducir automáticamente
                />
              ) : (
                <Image
                  source={{ uri: item.url }}
                  style={modalSelectorStyles.imageAndVideoMini}
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
        <View style={modalSelectorStyles.multimediaModalView}>
          <TouchableOpacity
            onPress={closeModal}
            style={buttonStyles.multimediaButtonStyle}
          >
            {selectedMediaUri && isVideo(selectedMediaUri) ? (
              <Video
                source={{ uri: selectedMediaUri?.url }}
                style={modalSelectorStyles.imageAndVideo}
                resizeMode="cover"
                useNativeControls // Mostrar controles para reproducir/pausar
                shouldPlay
                onError={(error) =>
                  console.error("Error al cargar el video:", error)
                }
              />
            ) : (
              <Image
                source={{ uri: selectedMediaUri?.url }}
                style={modalSelectorStyles.imageAndVideo}
              />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default MultimediaView;
