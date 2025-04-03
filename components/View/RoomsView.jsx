import React from 'react'
import { Text, View } from 'react-native'
import Button from '../Buttons/Button'
import useGetRooms from '../../hooks/useGetRooms';
import titlesStyles from '../../styles/commons/titlesStyles';
import buttonStyles from '../../styles/button/buttonStyles';
import useNavigate from '../../utils/navigation';

const RoomsView = () => {
    const { roomsList } = useGetRooms();
    const navigateToScreen = useNavigate();

    const navigateToSelectedRoom = (room) => {
        navigateToScreen("Room", { room });
    };

    const navigateToCreateRoom = () => {
        navigateToScreen("CreateRoom");
    };

    return (
        <View>
            <Text style={titlesStyles.createCircularTitle}>Salitas:</Text>
            {roomsList.map((room) => (
                <View key={room.id} style={buttonStyles.roomsButtonView}>
                    <Button
                        buttonRegularStyle={buttonStyles.createCircularButtonStyle}
                        titleStyle={buttonStyles.createCircularTextButtonStyle}
                        title={`Sala ${room.title}`}
                        onPress={() => navigateToSelectedRoom(room)}
                    />
                </View>
            ))}
            <View style={buttonStyles.createRoomButtonView}>
                <Button
                    buttonRegularStyle={buttonStyles.adminMenuButtonStyle}
                    title={"Crear aula"}
                    titleStyle={buttonStyles.adminTextButtonStyle}
                    onPress={navigateToCreateRoom}
                />
            </View>
        </View>
    )
}

export default RoomsView