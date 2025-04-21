import { useState, useEffect } from "react";
import { fetchCircularsByRoomOrAll } from "../config/db/circular/createCircular";

const useFetchCircularsByRoomOrAll = (childRoomId) => {
  const [circulars, setCirculars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCirculars = async () => {
      try {
        const circularsList = await fetchCircularsByRoomOrAll(childRoomId);
        setCirculars(circularsList);
      } catch (error) {
        console.error("Error al obtener las circulares:", error);
        setError(error);
      }
    };

    loadCirculars();
  }, []);

  return { circulars, setCirculars, error };
};

export default useFetchCircularsByRoomOrAll;