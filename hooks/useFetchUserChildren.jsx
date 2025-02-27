import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { fetchUserChildren } from "../config/db/child/child";
import { setChildren } from "../actions/childActions";

const useFetchUserChildren = (userId) => {
  const dispatch = useDispatch();
  //const [children, setChildren] = useState([]);
  //const [error, setError] = useState(null);

  useEffect(() => {
    const loadChildren = async () => {
      try {
        const childrenList = await fetchUserChildren(userId);
        dispatch(setChildren(childrenList));
      } catch (error) {
        console.error("Error al obtener los hijos del usuario:", error);
        setError(error);
      }
    };

    loadChildren();
  }, [userId, dispatch]);
};

export default useFetchUserChildren;
