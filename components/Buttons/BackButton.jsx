import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import useNavigate from "../../utils/navigation";
import { clearSelectedRoom } from "../../reducers/roomReducer";
import { useDispatch } from "react-redux";


const BackButton = ({ backButtonDestiny, childName }) => {
  const navigateToScreen = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => {
    //
    navigateToScreen(backButtonDestiny, { childName })
  }
  return (
    <TouchableOpacity
      onPress={goBack}
      style={{ width: "15%", paddingLeft: 15 }}
    >
      <AntDesign name="arrowleft" size={22} color="#e8aca0" />
    </TouchableOpacity>
  );
};

export default BackButton;
