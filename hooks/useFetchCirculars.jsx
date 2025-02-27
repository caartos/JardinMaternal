import { useState, useEffect } from "react";
import { fetchCirculars } from "../config/db/circular/createCircular";

const useFetchCirculars = () => {
  const [circulars, setCirculars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCirculars = async () => {
      try {
        const circularsList = await fetchCirculars();
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

export default useFetchCirculars;
