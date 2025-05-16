import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useFetchCircularsByRoomOrAll from "../../hooks/useFetchCircularsByRoomOrAll";
import { markNotificationsAsRead } from "../../config/db/notifications/notifications";
import circularViewStyles from "../../styles/src/circularViewStyles";
import useMarkNotificationsAsRead from "../../hooks/useMarkNotificationsAsRead";

const CircularsView = ({ childRoomId, childId, unreadCircularCount, userType, userId }) => {
  const { circulars } = useFetchCircularsByRoomOrAll(childRoomId);
  const [visibleCirculars, setVisibleCirculars] = useState(5);
  const [highlightedCirculars, setHighlightedCirculars] = useState([]);

  const sortedCirculars = circulars.sort((a, b) => {
    return b.timestamp.seconds - a.timestamp.seconds;
  });

  // useEffect(() => {
  //   if (unreadCircularCount > 0) {
  //     const recentCirculars = sortedCirculars.slice(0, unreadCircularCount);
  //     setHighlightedCirculars(recentCirculars);

  //     // Mantener el fondo destacado durante 15 segundos
  //     const timer = setTimeout(() => {
  //       setHighlightedCirculars([]);
  //       // Marcar las notificaciones como leídas después de 15 segundos
  //       useMarkNotificationsAsRead(userType, childId, "circular", userId );
  //     }, 5000);

  //     return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  //   }
  // }, [unreadCircularCount, sortedCirculars, childId]);

  const handleShowMore = () => {
    setVisibleCirculars((prevVisibleCirculars) => prevVisibleCirculars + 5);
  };

  return (
    <View
      style={circularViewStyles.container}
    >
      <View>
        <FlatList
          data={sortedCirculars.slice(0, visibleCirculars)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                circularViewStyles.circularItem,
                highlightedCirculars.includes(item) &&
                  circularViewStyles.highlightedCircular, // Resaltar si está en las destacadas
              ]}
            >
              <Text style={{ paddingVertical: 3 }}>
                {item.cargo} {item.nameSender}:
              </Text>
              <Text style={{ paddingVertical: 3 }}>
                {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}{" "}
                {new Date(item.timestamp.seconds * 1000).toLocaleTimeString()}
              </Text>
              <Text style={{ paddingVertical: 3, fontWeight: "bold" }}>
                {item.titulo}
              </Text>
              <Text style={{ paddingVertical: 3 }}>{item.circular}</Text>
            </View>
          )}
          ListFooterComponent={
            visibleCirculars < sortedCirculars.length && (
              <TouchableOpacity onPress={handleShowMore}>
                <Text
                  style={circularViewStyles.showMoreText}
                >
                  Ver más
                </Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
    </View>
  );
};

export default CircularsView;
