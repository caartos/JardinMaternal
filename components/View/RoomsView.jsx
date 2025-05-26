import React from "react";
import { Text, View } from "react-native";
import Button from "../Buttons/Button";
import titlesStyles from "../../styles/commons/titlesStyles";
import buttonStyles from "../../styles/button/buttonStyles";
import useNavigate from "../../utils/navigation";
import { useDispatch } from "react-redux";
import { setSelectedRoom } from "../../reducers/roomReducer";
import useNotifications from "../../hooks/useNotifications";
import notificationStyles from "../../styles/notification/notification";

const RoomsView = ({ roomsList, roomDestiny, userId }) => {
  const navigateToScreen = useNavigate();
  const dispatch = useDispatch();
  const notifications = useNotifications(userId);
  const navigateToSelectedRoom = (room) => {
    dispatch(setSelectedRoom(room));
    navigateToScreen(roomDestiny, { userId: userId });
  };

  return (
    <View>
      <Text style={titlesStyles.createCircularTitle}>Salitas:</Text>
      {roomsList.map((room) => {
        // Suponiendo que room.childrenIds es un array de los childId de esa sala
        const unreadCount = notifications.filter(
          (n) => room.childrenIds?.includes(n.childId) && !n.isRead
        ).length;

        return (
          <View key={room.id} style={buttonStyles.roomsButtonView}>
            <View style={{ position: "relative", alignSelf: "center" }}>
              <Button
                buttonRegularStyle={buttonStyles.createCircularButtonStyle}
                titleStyle={buttonStyles.createCircularTextButtonStyle}
                title={`Sala ${room.title}`}
                onPress={() => navigateToSelectedRoom(room)}
              />
              {unreadCount > 0 && (
                <View style={notificationStyles.teacherNotificationRoomsBadge}>
                  <Text style={notificationStyles.notificationText}>
                    {unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default RoomsView;
