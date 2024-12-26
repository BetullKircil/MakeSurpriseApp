import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import BottomBarNavigation from "../../components/common/BottomBarNavigation";
import useAsyncStorage from '../../helper/useAsyncStorage';
import CalenderEventModal from '../../components/Calender/CalenderEventModal';
import CalenderEventList from '../../components/Calender/CalenderEventList';
import {ipConfig} from "../../../scripts/enums"


const CalenderScreen = ({ navigation }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('calendar');

  async function getAllDates(){
    const UserId = Number(await getData("userID"));
    const response = await fetch(`${ipConfig}SpecialDayCalendar/GetAllSpecialDays?userId=${UserId}`)
    const data = await response.json();
    const specialDate = data["$values"]
    const specialDateArray = [];
    specialDate.forEach(specialDay => {
      specialDateArray.push({id: specialDay.specialDayId, title: specialDay.title, date: new Date(specialDay.specialDayDate + "Z")})
    });
    setEvents(specialDateArray);
  }

  const handleNavigation = (menu) => {
    setSelectedMenu(menu); 
    navigation.navigate(menu);
  };
  useEffect(
    () => {
      getAllDates();
    },
    []
  )

  const { getData } = useAsyncStorage();

  const onDateChange = useCallback((date) => {
    setSelectedStartDate(date);
    setIsModalVisible(true); 
  }, []);

  const startDate = selectedStartDate ? selectedStartDate.toISOString() : "";
  const selectedSpecialDate = selectedStartDate ? selectedStartDate.toDateString() : "";

  async function saveEvent(){
    if (selectedStartDate && eventTitle) {
      const UserId = Number(await getData("userID"));
      const response = await fetch(`${ipConfig}SpecialDayCalendar/AddSpecialDay`, 
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
    const response = await fetch(`${ipConfig}SpecialDayCalendar/DeleteSpecialDay?specialDayId=${id}` , 
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
      <CalenderEventModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={saveEvent}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
      />
      <CalenderEventList events={events} onDelete={deleteEvent} />
      <BottomBarNavigation selectedMenu={selectedMenu} navigation={navigation} onNavigate={handleNavigation}/>
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
    paddingBottom: 80,
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
