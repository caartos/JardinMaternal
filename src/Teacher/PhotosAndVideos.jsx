import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import { useSelector } from "react-redux";
import { updateSelectedRoom } from "../../reducers/roomReducer";
import useMultimediaPicker from "../../hooks/useMultimediaPicker";
import useUploadMedia from "../../hooks/useUploadMedia";
import AddMultimediaButton from "../../components/Buttons/AddMultimediaButton";
import MultimediaView from "../../components/View/MultimediaView";
import useMarkNotificationsAsRead from "../../hooks/useMarkNotificationsAsRead";
import useRoomMultimedia from "../../hooks/useRoomMultimedia";

const PhotosAndVideos = ({ route }) => {
  const { backButtonDestiny, childId } = route.params;
  const user = useSelector((state) => state.user.user);
  const room = useSelector((state) => state.room.selectedRoom);
  const { uploadMediaToFirestore } = useUploadMedia(); // Importar el hook de carga de medios
  const { pickAndUploadMedia, isPicking } = useMultimediaPicker(
    uploadMediaToFirestore
  );

  const multimedia = useRoomMultimedia(room?.id);

  useMarkNotificationsAsRead(user?.userType, childId, "multimedia", user.uid);

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
        <MultimediaView multimedia={multimedia} />
      </View>
    </SafeAreaView>
  );
};

export default PhotosAndVideos;
