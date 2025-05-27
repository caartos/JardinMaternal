import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
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
import useNotifications from "../hooks/useNotifications";
import { getChildObservations } from "../config/db/child/child";


const ChildMenu = () => {
  const child = useSelector((state) => state.child.selectedChild);
  const user = useSelector((state) => state.user.user);
  const notifications = useNotifications(user.uid);
  const dispatch = useDispatch();
  const navigateToScreen = useNavigate();
  const { room } = useGetRoomById(child.roomId);

  const circularNotifications = notifications.filter(
    (notification) =>
      notification.childId === child.id &&
      notification.type === "circular" &&
      !notification.isRead
  );

  const unreadCircularCount = circularNotifications.length;
  // Filtrar notificaciones por tipo
  const multimediaNotifications = notifications.filter(
    (notification) =>
      notification.childId === child.id &&
      notification.type === "multimedia" &&
      !notification.isRead
  );

  const navigateToPhotosAndVideos = async () => {
    dispatch(setSelectedRoom(room));
    navigateToScreen("PhotosAndVideos", {
      backButtonDestiny: "ChildMenu",
      childId: child.id,
    });
  };

  return (
    <SafeAreaView>
      <View style={registerStyles.registerMainViewTag}>
        <ChildHeader />
        <ChatButtonsView
          childName={child.nombre}
          childId={child.id}
          room={room}
        />
        <View style={styles.buttonContainer}>
          <Button
            title={"Fotos/Videos"}
            buttonRegularStyle={buttonStyles.photosAndVideosButtonStyle}
            titleStyle={buttonStyles.photosAndVideosButtonTextStyle}
            onPress={navigateToPhotosAndVideos} // Cambia esto a la función que maneja la navegación a fotos/videos
          />
          {multimediaNotifications.length > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>
                {multimediaNotifications.length}
              </Text>
            </View>
          )}
        </View>
        <ChildCommentsView childId={child.id} userId={user.uid} userType={user.userType} />
        <CircularsView
          childRoomId={child.roomId}
          childId={child.id}
          unreadCircularCount={unreadCircularCount}
          userType={user.userType}
          userId={user.uid}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "relative",
    alignSelf: "center",
    justifyContent: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ChildMenu;
