import { SafeAreaView, Text, View } from "react-native";
import registerStyles from "../../styles/src/registerStyles";
import { useState } from "react";
import titlesStyles from "../../styles/commons/titlesStyles";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import buttonStyles from "../../styles/button/buttonStyles";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import inputStyles from "../../styles/input/inputStyles";
import { createRoomInDB } from "../../config/db/room/room"; 

const CreateRoom = () => {
    const [room, setRoom] = useState({
        title: "",
        age: "",
    })

    const handleInputChange = (name, value) => {
        setRoom({
          ...room,
          [name]: value,
        });
      };

      const handleCreateRoom = async () => {
        try {
          const roomId = await createRoomInDB(room);
          console.log("Sala creada con ID: ", roomId);
        } catch (error) {
          console.error("Error al crear la sala: ", error);
        }
      };

    return (
        <SafeAreaView>
            <View style={registerStyles.registerMainViewTag}>
                <LoggedOutHeader title={"Crear aula"} backButtonDestiny={"AdminMenu"} />
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
    )
}

export default CreateRoom;