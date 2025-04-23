import React from "react";
import { SafeAreaView, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import { useSelector } from "react-redux";
import { updateSelectedRoom } from "../../reducers/roomReducer";
import useMultimediaPicker from "../../hooks/useMultimediaPicker";
import useUploadMedia from "../../hooks/useUploadMedia";
import AddMultimediaButton from "../../components/Buttons/AddMultimediaButton";
import MultimediaView from "../../components/View/MultimediaView";

const PhotosAndVideos = ({ route }) => {
  const { backButtonDestiny } = route.params;
  const user = useSelector((state) => state.user.user);
  const room = useSelector((state) => state.room.selectedRoom);
  const { uploadMediaToFirestore } = useUploadMedia(); // Importar el hook de carga de medios
  const { pickAndUploadMedia, isPicking } = useMultimediaPicker(
    uploadMediaToFirestore
  );

  const pickMedia = () => {
    pickAndUploadMedia(room, updateSelectedRoom);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <View style={registerStyles.photosAndVideosMainViewTag}>
        <LoggedOutHeader
          title={"Imagenes y Videos"}
          backButtonDestiny={backButtonDestiny}
        />
        <AddMultimediaButton
          userType={user?.userType}
          onPress={pickMedia}
          isPicking={isPicking}
        />
        <MultimediaView multimedia={room?.multimedia} />
      </View>
    </SafeAreaView>
  );
};

export default PhotosAndVideos;
