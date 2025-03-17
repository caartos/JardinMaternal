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
import titlesStyles from "../../styles/commons/titlesStyles";
import IconButton from "../../components/Buttons/IconButton";



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
        navigateToScreen("Room", { room });
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
                    <Text style={titlesStyles.createCircularTitle}>Niños sin sala asignada:</Text>
                    {childList.length > 0 ? childList.map((child) => (
                        <View key={child.id} style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignSelf: "center", alignItems: "center", marginVertical: 10 }}>
                            <Text style={titlesStyles.childAndRoomText}>{child.nombre} {child.apellido}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Picker
                                    selectedValue={selectedRoom[child.id] || ""}
                                    style={{ height: 30, width: 80, borderRadius: 10, justifyContent: "center" }}
                                    onValueChange={(itemValue) => setSelectedRoom({ ...selectedRoom, [child.id]: itemValue })}
                                >
                                    <Picker.Item label="Salas" value="" />
                                    {roomsList.map((room) => (
                                        <Picker.Item key={room.id} label={room.title} value={room.id} />
                                    ))}
                                </Picker>
                                <IconButton
                                    iconName={"arrowright"}
                                    onPress={() => handleAssignRoom(child.id, selectedRoom[child.id])}
                                    size={22}
                                    disabled={!selectedRoom[child.id]}
                                    particularStyle={buttonStyles.asignRoomToChildButton}
                                />
                            </View>
                        </View>
                    )) : <Text style={titlesStyles.childAndRoomText}>No hay niños sin sala</Text>}
                </View>
                <View>
                    <Text style={titlesStyles.createCircularTitle}>Salitas:</Text>
                    {roomsList.map((room) => (
                        <View key={room.id} style={{ marginVertical: 10 }}>
                            <Button
                                buttonRegularStyle={buttonStyles.createCircularButtonStyle}
                                titleStyle={buttonStyles.createCircularTextButtonStyle}
                                title={`Sala ${room.title}`}
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