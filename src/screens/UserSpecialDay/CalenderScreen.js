import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import BottomBarNavigation from "../../components/common/BottomBarNavigation";
import useAsyncStorage from "../../helper/useAsyncStorage";
import CalenderEventModal from "../../components/Calender/CalenderEventModal";
import CalenderEventList from "../../components/Calender/CalenderEventList";
import { ipConfig } from "../../../scripts/enums";

const CalenderScreen = ({ navigation }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("calendar");
  const [isLoading, setIsLoading] = useState(false);

  async function getAllDates() {
    const UserId = Number(await getData("userID"));
    try {
      const response = await fetch(
        `${ipConfig}SpecialDayCalendar/GetAllSpecialDays?userId=${UserId}`
      );
      setIsLoading(true);
      if (response.ok) {
        const data = await response.json();
        const specialDate = data["$values"];
        const specialDateArray = [];
        specialDate.forEach((specialDay) => {
          specialDateArray.push({
            id: specialDay.specialDayId,
            title: specialDay.title,
            date: new Date(specialDay.specialDayDate + "Z"),
          });
        });
        setEvents(specialDateArray);
      } else {
        console.error("Hata oluştu");
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleNavigation = (menu) => {
    setSelectedMenu(menu);
    navigation.navigate(menu);
  };

  useEffect(() => {
    getAllDates();
  }, []);

  const { getData } = useAsyncStorage();

  const onDateChange = useCallback((date) => {
    setSelectedStartDate(date);
    setIsModalVisible(true);
  }, []);

  const startDate = selectedStartDate ? selectedStartDate.toISOString() : "";
  const selectedSpecialDate = selectedStartDate
    ? selectedStartDate.toDateString()
    : "";

  async function saveEvent() {
    if (selectedStartDate && eventTitle) {
      const UserId = Number(await getData("userID"));
      const response = await fetch(
        `${ipConfig}SpecialDayCalendar/AddSpecialDay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Title: eventTitle,
            SpecialDayDate: startDate,
            UserId: UserId,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            id: data.specialDayId,
            date: new Date(data.specialDayDate),
            title: data.title,
          },
        ]);
      }
      setEventTitle("");
      setIsModalVisible(false);
    }
  }

  async function deleteEvent(id) {
    const response = await fetch(
      `${ipConfig}SpecialDayCalendar/DeleteSpecialDay?specialDayId=${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.nestedContainer}>
        <CalendarPicker
          onDateChange={onDateChange}
          selectedDayColor="#dfb8ff"
          todayBackgroundColor="#EEEFF3"
          textStyle={{ color: "#333" }}
        />
        <View style={styles.calenderContainer}>
          <Text style={styles.calenderText}>Seçilen Gün:</Text>
          <Text style={styles.dateText}>{selectedSpecialDate}</Text>
        </View>
        <CalenderEventModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={saveEvent}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
        />
        </View>
        <View style={styles.eventListStyle}>
          <CalenderEventList events={events} onDelete={deleteEvent} />
        </View>
      <BottomBarNavigation
        selectedMenu={selectedMenu}
        navigation={navigation}
        onNavigate={handleNavigation}
      />
    </View>
  );
};

export default CalenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  nestedContainer: {
    flex: 1,
    padding: 20,
  },
  eventListStyle: {
    flex: 1,
    paddingHorizontal: 6,
    marginTop: -60
  },
  calenderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#e6e6fa',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calenderText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
