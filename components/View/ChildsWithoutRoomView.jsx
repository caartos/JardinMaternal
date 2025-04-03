import React, { useState } from 'react'
import { Text, View } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import IconButton from '../Buttons/IconButton'
import titlesStyles from '../../styles/commons/titlesStyles'
import buttonStyles from '../../styles/button/buttonStyles'
import modalSelectorStyles from '../../styles/commons/modalSelectorStyles'
import useAssignRoomToChild from '../../hooks/useAssigneRoomToChild'
import useGetChildrenWithoutRoom from '../../hooks/useGetChildrenWithoutRoom'
import useGetRooms from '../../hooks/useGetRooms'

const ChildsWithoutRoomView = () => {
    const { childrenList, setChildrenList } = useGetChildrenWithoutRoom();
    const [selectedRoom, setSelectedRoom] = useState({});
    const { roomsList } = useGetRooms();
    const { assignRoom } = useAssignRoomToChild(setChildrenList);

    const handleAssignRoom = async (childId, roomId) => {
        // Llamamos al hook para manejar la lógica de asignación
        await assignRoom(childId, roomId);
    };

    return (
        <View>
            <Text style={titlesStyles.createCircularTitle}>
                Niños sin sala asignada:
            </Text>
            {childrenList.length > 0 ? (
                childrenList.map((child) => (
                    <View
                        key={child.id}
                        style={titlesStyles.childrenListView}
                    >
                        <View
                            style={titlesStyles.childrenListTitleView}
                        >
                            <Text style={titlesStyles.childAndRoomText}>
                                {child.nombre} {child.apellido}
                            </Text>
                        </View>
                        <View
                            style={buttonStyles.modalSelectorsView}
                        >
                            <ModalSelector
                                data={roomsList.map((room) => ({
                                    key: room.id,
                                    label: room.title,
                                }))}
                                initValue={
                                    selectedRoom[child.id]
                                        ? roomsList.find(
                                            (room) => room.id === selectedRoom[child.id]
                                        )?.title
                                        : "Seleccionar sala"
                                }
                                onChange={(option) =>
                                    setSelectedRoom({
                                        ...selectedRoom,
                                        [child.id]: option.key,
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
                                    handleAssignRoom(child.id, selectedRoom[child.id])
                                }
                                color={"#6B7672"}
                                size={22}
                                disabled={!selectedRoom[child.id]}
                                particularStyle={buttonStyles.asignRoomToChildButton}
                            />
                        </View>
                    </View>
                ))
            ) : (
                <Text style={titlesStyles.childAndRoomText}>
                    No hay niños sin sala
                </Text>
            )}
        </View>
    )
}

export default ChildsWithoutRoomView