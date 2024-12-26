import React, { memo } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { StyleSheet, Text, View } from "react-native";

const CalendarPickerComponent = ({ selectedDate, onDateChange }) => {
  return (
    <View>
      <CalendarPicker onDateChange={onDateChange} />
      <View style={styles.calenderContainer}>
        <Text style={styles.calenderText}>Seçilen Gün: </Text>
        <Text style={styles.dateText}>{selectedDate}</Text>
      </View>
    </View>
  );
};

export default memo(CalendarPickerComponent);

const styles = StyleSheet.create({
  calenderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
  },
  calenderText: {
    fontSize: 16,
  },
  dateText: {
    fontWeight: "bold",
  },
});
