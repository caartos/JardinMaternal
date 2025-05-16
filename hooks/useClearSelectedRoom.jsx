import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearSelectedRoom } from "../reducers/roomReducer";

const useClearSelectedRoom = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSelectedRoom());
    };
  }, [dispatch]);
};

export default useClearSelectedRoom;