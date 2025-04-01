import React from "react";
import { View, Text } from "react-native";
import inputStyles from "../../styles/input/inputStyles";
import registerStyles from "../../styles/src/registerStyles";
import titlesStyles from "../../styles/commons/titlesStyles";
import IconButton from "../Buttons/IconButton";
import Input from "../Input/Input";


const CircularsEditingView = ({
  circulars,
  editingCircular,
  handleEditCircular,
  handleInputChange,
  handleSaveCircular,
  setEditingCircular,
  confirmDeleteCircular,
}) => {
  return (
    <>
      {circulars.map((circular) => (
        <View key={circular.id} style={registerStyles.circularItem}>
          {editingCircular && editingCircular.id === circular.id ? (
            <>
              <Input
                inputStyle={inputStyles.titleCircularInput}
                placeholder="Título"
                value={editingCircular.titulo}
                onChangeText={(text) => handleInputChange("titulo", text)}
              />
              <Input
                inputStyle={inputStyles.circularInput}
                placeholder="Nueva Circular"
                value={editingCircular.circular}
                onChangeText={(text) => handleInputChange("circular", text)}
                multiline={true}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 15,
                }}
              >
                <IconButton
                  iconName="save"
                  onPress={() =>
                    handleSaveCircular(editingCircular)
                  }
                  size={50}
                />
                <IconButton
                  iconName="cross"
                  color={"#6B7672"}
                  onPress={() => setEditingCircular(null)}
                  size={50}
                />
              </View>
            </>
          ) : (
            <>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                  <Text style={titlesStyles.circularTitle}>{circular.titulo}</Text>
                  <Text style={titlesStyles.circularDate}>
                    {new Date(circular.timestamp.seconds * 1000).toLocaleDateString()}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                  <IconButton iconName="delete" onPress={() => confirmDeleteCircular(circular.id)} size={25} />
                  <IconButton iconName="edit" onPress={() => handleEditCircular(circular)} size={25} />
                </View>
              </View>
              <Text style={titlesStyles.circularContent}>{circular.circular}</Text>
            </>
          )}
        </View>
      ))}
    </>
  );
};

export default CircularsEditingView;