import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Modal, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import BottomBarNavigation from "../components/BottomBarNavigation";

const CalenderScreen = ({ navigation }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);

  const onDateChange = useCallback((date) => {
    setSelectedStartDate(date);
    setIsModalVisible(true); 
  }, []);

  const startDate = selectedStartDate ? selectedStartDate.toDateString() : "";

  const saveEvent = () => {
    if (selectedStartDate && eventTitle) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: selectedStartDate.toString(), date: startDate, title: eventTitle },
      ]);
      setEventTitle("");
      setIsModalVisible(false);
    }
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
  };

  return (
    <View style={styles.container}>
      <CalendarPicker onDateChange={onDateChange} />
      <View style={styles.calenderContainer}>
        <Text style={styles.calenderText}>Seçilen Gün: </Text>
        <Text style={styles.dateText}>{startDate}</Text>
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Özel Gün Ekleyin</Text>
            <TextInput
              style={styles.input}
              placeholder="Başlık girin"
              value={eventTitle}
              onChangeText={setEventTitle}
            />
            <View style={styles.popupButtons}>
            <Button title="Kaydet" onPress={saveEvent}/>
            <View style={styles.gap}></View>
            <Button title="İptal" onPress={() => setIsModalVisible(false)} color="red"/>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.eventsList}>
        <Text style={styles.eventsTitle}>Kaydedilen Günler:</Text>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <Text style={styles.eventDate}>{item.date}</Text>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => deleteEvent(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <BottomBarNavigation navigation={navigation}/>
    </View>
  );
};

export default CalenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eedaf0",
    marginTop: 100,
  },
  calenderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5
  },
  popupButtons: {
    flexDirection: 'row',
  },
  saveButton: {
    paddingHorizontal: 5
  },
  gap: {
    paddingHorizontal: 10
  },
  cancelButton: {
    paddingHorizontal: 5
  },
  selectedText: {
    textAlign: 'center',
    paddingVertical: 5
  },
  dateText: {
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 5,
  },
  eventsList: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 80, // Avoids overlap with BottomBarNavigation
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  eventDate: {
    fontSize: 14,
    color: "#333",
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
