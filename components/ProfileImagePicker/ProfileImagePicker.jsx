import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import inputStyles from "../../styles/input/inputStyles";

const ProfileImagePicker = ({ profileImage, setProfileImage }) => {
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      // 🔹 Solo actualiza el estado, no sube a Firebase aún
      // setUser((prevUser) => ({
      //   ...prevUser,
      //   profileImage: imageUri,
      // }));
    }
  };
  return (
    <View style={inputStyles.inputViewTagStyle}>
      <Text style={inputStyles.inputTitleTextTag}>Imagen de perfil</Text>
      <TouchableOpacity onPress={handleImagePick}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : (
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Seleccionar imagen</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImagePicker;
