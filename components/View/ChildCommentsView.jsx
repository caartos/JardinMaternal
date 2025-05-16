import React from "react";
import { Text, View } from "react-native";

const ChildCommentsView = ({ childComments={} }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "80%",
        borderRadius: 10,
        padding: 10,
        alignSelf: "center",
        marginBottom: 20,
      }}
    >
      <Text style={{ padding: 5, fontWeight: "bold", fontSize: 17 }}>
        Comentarios:
      </Text>
      <Text style={{ paddingLeft: 10, padding: 5, fontSize: 15 }}>
        Siesta: {childComments.siesta || ""}
      </Text>
      <Text style={{ paddingLeft: 10, padding: 5, fontSize: 15 }}>
      Baño: {childComments.baño ? `${childComments.baño} 💩` : ""}
      </Text>
      <Text style={{ paddingLeft: 10, padding: 5, fontSize: 15 }}>
        Merienda: {childComments.merienda || ""}
      </Text>
      <Text style={{ paddingLeft: 10, padding: 5, fontSize: 15 }}>
        Comentarios: {childComments.comentarios || ""}
      </Text>
    </View>
  );
};

export default ChildCommentsView;
