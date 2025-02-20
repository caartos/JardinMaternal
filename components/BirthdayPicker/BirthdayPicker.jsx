import React from "react";
import { View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import inputStyles from "../../styles/input/inputStyles";
import dateTimePicker from "../../styles/dateTimePicker/dateTimePicker";


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
              style={dateTimePicker.dateTimePicker}
              value={date}
              mode="date"
              display={Platform ? "spinner" : "calendar"}
              onChange={handleDateChange}
            />
          </View>
  );
};

export default BirthdayPicker;
