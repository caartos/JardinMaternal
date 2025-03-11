import { SafeAreaView, ScrollView, View, Picker, Text } from "react-native"
import registerStyles from "../../styles/src/registerStyles";
import { useEffect, useState } from "react";
import { assignRoomToChild, fetchChildrenWithoutRoom } from "../../config/db/child/child";
import LoggedOutHeader from "../../components/Headers/LoggedOutHeader";
import Button from "../../components/Buttons/Button";
import buttonStyles from "../../styles/button/buttonStyles";
import useNavigate from "../../utils/navigation";
import { useDispatch } from "react-redux";
import { setChildren } from "../../actions/childActions";
import { fetchAvailableRooms } from "../../config/db/room/room";



const RoomAndChild = () => {
    const navigateToScreen = useNavigate();
    const dispatch = useDispatch();
    const [childList, setChildList] = useState([]);
    const [roomsList, setRoomsList] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState({});


    const navigateToCreateRoom = () => {
        navigateToScreen("CreateRoom")
    }

    const navigateToSelectedRoom = (room) => {
        navigateToScreen("Room",  {room});
    };

    useEffect(() => {
        const getChildList = async () => {
            const children = await fetchChildrenWithoutRoom();
            setChildList(children);
        };

        const getRoomsList = async () => {
            const rooms = await fetchAvailableRooms();
            setRoomsList(rooms);
        };

        getChildList();
        getRoomsList();
    }, []);

    console.log("CHILDLIST", childList)
    console.log("ROOMLIST", roomsList)

    const handleAssignRoom = async (childId, roomId) => {
        await assignRoomToChild(childId, roomId);
        const updatedChildren = await fetchChildrenWithoutRoom();
        setChildList(updatedChildren);
        dispatch(setChildren(updatedChildren));
    };

    return (
        <SafeAreaView>
            <ScrollView style={registerStyles.registerMainViewTag}>
                <LoggedOutHeader title={"Salas y alumnos"} backButtonDestiny={"AdminMenu"} />
                <View>
                    <Text>Niños sin sala asignada:</Text>
                    {childList.map((child) => (
                        <View key={child.id} style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                            <Text>{child.nombre} {child.apellido}</Text>
                            <Picker
                                selectedValue={selectedRoom[child.id] || ""}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue) => setSelectedRoom({ ...selectedRoom, [child.id]: itemValue })}
                            >
                                <Picker.Item label="Seleccionar sala" value="" />
                                {roomsList.map((room) => (
                                    <Picker.Item key={room.id} label={room.title} value={room.id} />
                                ))}
                            </Picker>
                            <Button
                                title="Asignar Sala"
                                onPress={() => handleAssignRoom(child.id, selectedRoom[child.id])}
                                disabled={!selectedRoom[child.id]}
                            />
                        </View>
                    ))}
                </View>
                <View>
                    <Text>Salas disponibles:</Text>
                    {roomsList.map((room) => (
                        <View key={room.id} style={{ marginVertical: 10 }}>
                            <Button
                                buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
                                title={`Ver ${room.title}`}
                                titleStyle={buttonStyles.adminTextButtonStyle}
                                onPress={() => navigateToSelectedRoom(room)}
                            />
                        </View>
                    ))}
                </View>
                <View style={{ alignItems: "center", paddingTop: 20 }}>
                    <Button
                        buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
                        title={"Crear aula"}
                        titleStyle={buttonStyles.adminTextButtonStyle}
                        onPress={navigateToCreateRoom}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RoomAndChild;