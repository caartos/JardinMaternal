import React, { useState } from 'react'
import { Text, View } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import IconButton from '../Buttons/IconButton'
import buttonStyles from '../../styles/button/buttonStyles'
import titlesStyles from '../../styles/commons/titlesStyles'
import useFetchTeachers from '../../hooks/useFetchTeachers'
import { assignRoomToTeacher } from '../../config/db/users/users'
import useGetRooms from '../../hooks/useGetRooms'
import useDeleteTeacher from '../../hooks/useDeleteTeacher'
import RoomModalSelector from '../ModalSelector/RoomModalSelector'

const TeachersView = () => {
    const { teachers } = useFetchTeachers();
    const { roomsList } = useGetRooms();
    const [selectedRoom, setSelectedRoom] = useState({});
    const { deleteUser } = useDeleteTeacher();

    const handleAssignRoomToTeacher = async (teacherId, roomId) => {
        await assignRoomToTeacher(teacherId, roomId);
    };

    const handleDeleteTeacher = async (teacherId) => {
        await deleteUser(teacherId);
    };

    return (
        <>
            <Text style={titlesStyles.createCircularTitle}>
                Todos los maestros:
            </Text>
            {teachers.length > 0 ? (
                teachers.map((teacher) => (
                    <View
                        key={teacher.id}
                        style={titlesStyles.childrenListView}
                    >
                        <Text style={titlesStyles.childAndRoomText}>
                            {teacher.nombre} {teacher.apellido}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <RoomModalSelector uId={teacher.id} handleAssignRoom={handleAssignRoomToTeacher} />
                            <IconButton
                                iconName={"deleteuser"}
                                onPress={() => handleDeleteTeacher(teacher.id)}
                                color={"#ffe9e4"}
                                size={22}
                                disabled={!selectedRoom[teacher.id]}
                                particularStyle={buttonStyles.deleteTeacherButton}
                            />
                        </View>
                    </View>
                ))
            ) : (
                <Text style={titlesStyles.childAndRoomText}>No hay maestros</Text>
            )}</>
    )
}

export default TeachersView