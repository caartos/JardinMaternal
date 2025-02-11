import React from "react";
import { View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import inputStyles from "../../styles/input/inputStyles";


const BirthdayPicker = ({ date, setDateChange }) => {
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDateChange(currentDate);
  };

  return (
    <View style={{ marginVertical: 5, alignItems: "center" }}>
            <Text style={inputStyles.inputTitleTextTag}>
              Fecha de Nacimiento*
            </Text>
            <DateTimePicker
              style={{
                backgroundColor: "white",
                marginTop: 10,
                borderRadius: 50,
                width: "85%",
                height: 55,
                paddingLeft: 10,
              }}y
              value={date}
              mode="date"
              display={Platform ? "spinner" : "calendar"}
              onChange={handleDateChange}
            />
          </View>
  );
};

export default BirthdayPicker;
