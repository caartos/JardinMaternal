import React from 'react'
import { Text, View } from 'react-native'
import titlesStyles from '../../styles/commons/titlesStyles'
import buttonStyles from '../../styles/button/buttonStyles'
import useAssignRoomToChild from '../../hooks/useAssigneRoomToChild'
import useGetChildrenWithoutRoom from '../../hooks/useGetChildrenWithoutRoom'
import RoomModalSelector from '../ModalSelector/RoomModalSelector'

const ChildsWithoutRoomView = () => {
    const { childrenList, setChildrenList } = useGetChildrenWithoutRoom();
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
                            <RoomModalSelector uId={child.id} handleAssignRoom={handleAssignRoom}/>
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