import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import AdminOptionsHeader from "../../components/Headers/AdminOptionsHeader";
import registerStyles from "../../styles/src/registerStyles";
import titlesStyles from "../../styles/commons/titlesStyles";
import useFetchCirculars from "../../hooks/useFetchCirculars";
import useDeleteCircular from "../../hooks/useDeleteCircular";
import useUpdateCircular from "../../hooks/useUpdateCircular";
import Title from "../../components/Title/Title";
import CircularsEditingView from "../../components/View/CircularsEditingView";
import { useSelector } from "react-redux";
import useFetchCircularsByTitle from "../../hooks/useFetchCircularsByTitle";

const AllCirculars = ({ route }) => {
  const backButtonDestiny = route.params;
  const loggedUser = useSelector((state) => state.user.user);
  const selectedRoomTitle = useSelector(
    (state) => state.room.selectedRoom?.title
  );
  const room = loggedUser.rooms ? selectedRoomTitle : null;
  const { circulars, setCirculars } = room? useFetchCircularsByTitle(room) : useFetchCirculars();
  const { handleDeleteCircular } = useDeleteCircular();
  const { handleSaveCircular } = useUpdateCircular();
  const [editingCircular, setEditingCircular] = useState(null);

  const confirmDeleteCircular = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar esta circular?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => handleDeleteCircular(id, setCirculars),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleEditCircular = (circular) => {
    setEditingCircular(circular);
  };

  const handleInputChange = (name, value) => {
    setEditingCircular({
      ...editingCircular,
      [name]: value,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={registerStyles.registerMainViewTag}>
        <AdminOptionsHeader
          title={"Circulares"}
          backButtonDestiny={backButtonDestiny}
        />
        <Title
          titleStyle={titlesStyles.createCircularTitle}
          title="Todas las circulares"
        />
        <CircularsEditingView
          circulars={circulars}
          editingCircular={editingCircular}
          handleEditCircular={handleEditCircular}
          handleInputChange={handleInputChange}
          handleSaveCircular={(circular) =>
            handleSaveCircular(circular, setCirculars, setEditingCircular)
          }
          setEditingCircular={setEditingCircular}
          confirmDeleteCircular={confirmDeleteCircular}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllCirculars;
