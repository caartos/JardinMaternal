import { useEffect, useState } from "react";
import { markNotificationsAsRead } from "../config/db/notifications/notifications";

const useHighlightNotifications = (unreadCircularCount, sortedCirculars, userType, childId, userId) => {
  const [highlightedCirculars, setHighlightedCirculars] = useState([]);

  useEffect(() => {
    if (unreadCircularCount > 0) {
      // Obtén las circulares más recientes no leídas
      const recentCirculars = sortedCirculars.slice(0, unreadCircularCount);
      setHighlightedCirculars(recentCirculars);

      // Mantén el fondo destacado durante 15 segundos
      const timer = setTimeout(() => {
        setHighlightedCirculars([]);
        // Marca las notificaciones como leídas después de 15 segundos
        markNotificationsAsRead(userType, childId, "circular", userId);
      }, 15000);

      return () => clearTimeout(timer); // Limpia el temporizador al desmontar
    }
  }, [unreadCircularCount, sortedCirculars, userType, childId, userId]);

  return highlightedCirculars;
};

export default useHighlightNotifications;