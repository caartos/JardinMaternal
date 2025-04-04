import { SafeAreaView, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import { useState } from "react";
import titlesStyles from "../../styles/commons/titlesStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import buttonStyles from "../../styles/button/buttonStyles";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import inputStyles from "../../styles/input/inputStyles";
import useCreateRoom from "../../hooks/useCreateRoom";

const CreateRoom = () => {
  const { createRoom } = useCreateRoom();
  const [room, setRoom] = useState({
    title: "",
    age: "",
  });

  const handleInputChange = (name, value) => {
    setRoom({
      ...room,
      [name]: value,
    });
  };

  const handleCreateRoom = async () => {
    await createRoom(room, setRoom);
  };

  return (
    <SafeAreaView>
      <View style={registerStyles.registerMainViewTag}>
        <LoggedOutHeader title={"Crear aula"} backButtonDestiny={"RoomAndChild"} />
        <View>
          <Title
            titleStyle={titlesStyles.createCircularTitle}
            title="Nueva aula"
          />
          <Input
            inputStyle={inputStyles.titleCircularInput}
            placeholder="Nombre del aula"
            value={room.title}
            onChangeText={(text) => handleInputChange("title", text)}
          />
          <Input
            inputStyle={inputStyles.titleCircularInput}
            placeholder="Edad"
            value={room.age}
            onChangeText={(text) => handleInputChange("age", text)}
          />
          <Button
            buttonRegularStyle={buttonStyles.createCircularButtonStyle}
            titleStyle={buttonStyles.createCircularTextButtonStyle}
            title="Crear aula"
            onPress={handleCreateRoom}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateRoom;
