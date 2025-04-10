import { useState, useEffect } from "react";
import { fetchCircularsByTitle } from "../config/db/circular/createCircular";

const useFetchCircularsByTitle = (title) => {
    console.log(title)
  const [circulars, setCirculars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCirculars = async () => {
      try {
        const circularsList = await fetchCircularsByTitle(title);
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

export default useFetchCircularsByTitle;
