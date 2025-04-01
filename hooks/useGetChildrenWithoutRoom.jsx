import { useEffect, useState } from "react";
import { fetchChildrenWithoutRoom } from "../config/db/child/child";


const useGetChildrenWithoutRoom = () => {
  const [childrenList, setChildrenList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChildren = async () => {
      try {
        const children = await fetchChildrenWithoutRoom();
        setChildrenList(children);
      } catch (err) {
        console.error("Error al obtener niños sin sala:", err);
        setError(err);
      }
    };

    getChildren();
  }, []);

  return { childrenList, setChildrenList, error };
};

export default useGetChildrenWithoutRoom;