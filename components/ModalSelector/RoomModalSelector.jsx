import React, { useState } from 'react'
import ModalSelector from 'react-native-modal-selector'
import useGetRooms from '../../hooks/useGetRooms';
import modalSelectorStyles from '../../styles/commons/modalSelectorStyles';
import IconButton from '../Buttons/IconButton';
import buttonStyles from '../../styles/button/buttonStyles';

const RoomModalSelector = ({ uId, handleAssignRoom }) => {
    const [selectedRoom, setSelectedRoom] = useState({});
    const { roomsList } = useGetRooms();

    return (
        <>
            <ModalSelector
                data={roomsList.map((room) => ({
                    key: room.id,
                    label: room.title,
                }))}
                initValue={
                    selectedRoom[uId]
                        ? roomsList.find(
                            (room) => room.id === selectedRoom[uId]
                        )?.title
                        : "Seleccionar sala"
                }
                onChange={(option) =>
                    setSelectedRoom({
                        ...selectedRoom,
                        [uId]: option.key,
                    })
                }
                style={modalSelectorStyles.modalSelector}
                selectTextStyle={{ fontSize: 14 }}
                optionContainerStyle={{ backgroundColor: "#fff3f1" }}
                cancelStyle={{ backgroundColor: "#fff3f1" }}
                cancelText="Cancelar"
                optionTextStyle={{
                    fontSize: 14,
                    color: "#e8aca0",
                    backgroundColor: "#fff3f1",
                }}
            />
            <IconButton
                iconName={"arrowright"}
                onPress={() =>
                    handleAssignRoom(uId, selectedRoom[uId])
                }
                color={"#6B7672"}
                size={22}
                disabled={!selectedRoom[uId]}
                particularStyle={buttonStyles.asignRoomToChildButton}
            />
        </>
    )
}

export default RoomModalSelector