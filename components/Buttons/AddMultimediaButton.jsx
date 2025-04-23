import React from "react";
import Button from "../Buttons/Button"; // Asegúrate de que la ruta sea correcta
import buttonStyles from "../../styles/button/buttonStyles";

const AddMultimediaButton = ({ userType, onPress, isPicking }) => {
  if (userType === "PADRE") {
    return null; // No mostrar el botón si el usuario es "PADRE"
  }

  return (
    <Button
      buttonRegularStyle={buttonStyles.createCircularButtonStyle}
      titleStyle={buttonStyles.createCircularTextButtonStyle}
      title={isPicking ? "Seleccionando..." : "Agregar imagen/video"}
      onPress={onPress}
      disabled={isPicking} // Deshabilitar mientras se seleccionan medios
    />
  );
};

export default AddMultimediaButton;