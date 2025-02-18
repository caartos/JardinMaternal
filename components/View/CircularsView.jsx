import React, { useState } from "react";
import circulars from "../../config/seed/circulares";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const CircularsView = () => {
  const [visibleCirculars, setVisibleCirculars] = useState(5);

  const sortedCirculars = circulars.sort((a, b) => {
    const dateA = new Date(`${a.dia.split('/').reverse().join('-')}T${a.hora}`);
    const dateB = new Date(`${b.dia.split('/').reverse().join('-')}T${b.hora}`);
    return dateB - dateA;
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
              <Text style={{ paddingVertical: 3 }}>Directora:</Text>
              <Text style={{ paddingVertical: 3 }}>
                {item.dia} {item.hora}
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
      {/* {circulars.map((circular) => (
        <View style={{ marginBottom: 25 }}>
          <Text style={{ paddingVertical: 3 }}>Directora:</Text>
          <Text style={{ paddingVertical: 3 }}>
            {circular.dia} {circular.hora}
          </Text>
          <Text style={{ paddingVertical: 3 }}>{circular.circular}</Text>
        </View>
      ))} */}
    </View>
  );
};

export default CircularsView;
