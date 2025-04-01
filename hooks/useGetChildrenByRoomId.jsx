import { useEffect, useState } from "react";
import { fetchChildrenByRoomId } from "../config/db/child/child";

const useGetChildrenByRoomId = (roomId) => {
  const [childrenList, setChildrenList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChildrenList = async () => {
      try {
        const children = await fetchChildrenByRoomId(roomId);
        setChildrenList(children);
      } catch (err) {
        console.error("Error al obtener los niños por roomId:", err);
        setError(err);
      }
    };

    getChildrenList();
  }, [roomId]);

  return { childrenList, setChildrenList, error };
};

export default useGetChildrenByRoomId;