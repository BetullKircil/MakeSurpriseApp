import React, { memo } from "react";
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const CalenderEventList = ({ events, onDelete }) => {
  return (
    <View style={styles.eventsList}>
      <Text style={styles.eventsTitle}>Kaydedilen Günler:</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventDate}>{item.date.toLocaleDateString()}</Text>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              style={styles.deleteButton}
            >
              <Image
                  source={require('@/assets/images/delete-special-day-icon.png')}
                  style={styles.navIconProfile}
                  />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default memo(CalenderEventList);

const styles = StyleSheet.create({
  eventsList: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  navIconProfile: {
    width: 25,
    height: 25,
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
    color: "#7B1FA2",
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  deleteButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
