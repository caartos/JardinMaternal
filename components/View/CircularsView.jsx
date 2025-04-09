import React, { useState } from "react";
//import circulars from "../../config/seed/circulares";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import useFetchCirculars from "../../hooks/useFetchCirculars";

const CircularsView = () => {
  const { circulars } = useFetchCirculars();
  const [visibleCirculars, setVisibleCirculars] = useState(5);

  const sortedCirculars = circulars.sort((a, b) => {
    return b.timestamp.seconds - a.timestamp.seconds;
  });

  const handleShowMore = () => {
    setVisibleCirculars((prevVisibleCirculars) => prevVisibleCirculars + 5);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        alignSelf: "center",
        width: "90%",
        borderRadius: 10,
        padding: 20,
        height: "58%",
      }}
    >
      <View>
        <FlatList
          data={sortedCirculars.slice(0, visibleCirculars)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 25 }}>
              <Text style={{ paddingVertical: 3 }}>{item.cargo} {item.nameSender}:</Text>
              <Text style={{ paddingVertical: 3 }}>
                {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}{" "}
                {new Date(item.timestamp.seconds * 1000).toLocaleTimeString()}
              </Text>
              <Text style={{ paddingVertical: 3, fontWeight: "bold" }}>
                {item.titulo}
              </Text>
              <Text style={{ paddingVertical: 3 }}>{item.circular}</Text>
            </View>
          )}
          ListFooterComponent={
            visibleCirculars < sortedCirculars.length && (
              <TouchableOpacity onPress={handleShowMore}>
                <Text
                  style={{
                    textAlign: "center",
                    marginVertical: 10,
                    color: "#e8aca0",
                    fontWeight: "bold",
                  }}
                >
                  Ver más
                </Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
    </View>
  );
};

export default CircularsView;
