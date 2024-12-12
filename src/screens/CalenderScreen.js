import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import BottomBarNavigation from "../components/BottomBarNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalenderScreen = ({ navigation }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);

  async function getAllDates(){
    const UserId = Number(await getData("userID"));
    const response = await fetch(`http://192.168.1.129:5159/SpecialDayCalendar/GetAllSpecialDays?userId=${UserId}`)
    const data = await response.json();
    const specialDate = data["$values"]
    const specialDateArray = [];
    specialDate.forEach(specialDay => {
      specialDateArray.push({id: specialDay.specialDayId, title: specialDay.title, date: new Date(specialDay.specialDayDate + "Z")})
    });
    setEvents(specialDateArray);
  }
  
  useEffect(
    () => {
      getAllDates();
    }
  )

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }
  const onDateChange = useCallback((date) => {
    setSelectedStartDate(date);
    setIsModalVisible(true); 
  }, []);

  const startDate = selectedStartDate ? selectedStartDate.toISOString() : "";
  const selectedSpecialDate = selectedStartDate ? selectedStartDate.toDateString() : "";

  async function saveEvent(){
    if (selectedStartDate && eventTitle) {
      const UserId = Number(await getData("userID"));
      const response = await fetch("http://192.168.1.129:5159/SpecialDayCalendar/AddSpecialDay", 
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({Title: eventTitle, SpecialDayDate: startDate, UserId: UserId})
        }
      )
      if(response.ok){
        const data = await response.json()
        setEvents((prevEvents) => [
          ...prevEvents,
          { id: data.specialDayId, date: new Date(data.specialDayDate), title: data.title },
        ]);
      }
      setEventTitle("");
      setIsModalVisible(false);
    }
  };

  async function deleteEvent(id){
    const response = await fetch(`http://192.168.1.129:5159/SpecialDayCalendar/DeleteSpecialDay?specialDayId=${id}` , 
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
        }
    )
    if(response.ok){
      setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <CalendarPicker onDateChange={onDateChange} />
      <View style={styles.calenderContainer}>
        <Text style={styles.calenderText}>Seçilen Gün: </Text>
        <Text style={styles.dateText}>{selectedSpecialDate}</Text>
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
              <Text style={styles.eventDate}>{item.date.getDate()}/{item.date.getMonth() + 1}/{item.date.getFullYear()}</Text>
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
