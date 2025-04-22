import React, { useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChildHeader from "../components/Headers/ChildHeader";
import ChatButtonsView from "../components/View/ChatButtonsView";
import registerStyles from "../styles/src/registerStyles";
import ChildCommentsView from "../components/View/ChildCommentsView";
import CircularsView from "../components/View/CircularsView";
import { useDispatch, useSelector } from "react-redux";
import useGetRoomById from "../hooks/useGetRoomById";
import Button from "../components/Buttons/Button";
import buttonStyles from "../styles/button/buttonStyles";
import useNavigate from "../utils/navigation";
import { setSelectedRoom } from "../reducers/roomReducer";

const ChildMenu = () => {
  const child = useSelector((state) => state.child.selectedChild);
  const dispatch = useDispatch();
  const navigateToScreen = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null); // Para la imagen en tamaño completo
  const [isModalVisible, setIsModalVisible] = useState(false); // Controla el modal
  const { room } = useGetRoomById(child.roomId);
  
  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };

  const navigateToPhotosAndVideos = () => {
    dispatch(setSelectedRoom(room));
    navigateToScreen("PhotosAndVideos", { backButtonDestiny: "ChildMenu" });
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <SafeAreaView>
      <View style={registerStyles.registerMainViewTag}>
        <ChildHeader />
        <ChatButtonsView childName={child.nombre} room={room} />
        <Button
          title={"Fotos/Videos"}
          buttonRegularStyle={buttonStyles.photosAndVideosButtonStyle}
          titleStyle={buttonStyles.photosAndVideosButtonTextStyle}
          onPress={navigateToPhotosAndVideos} // Cambia esto a la función que maneja la navegación a fotos/videos
        />
        <ChildCommentsView childComments={child.observaciones} />
        <CircularsView childRoomId={child.roomId} />
        
      </View>
    </SafeAreaView>
  );
};

export default ChildMenu;
