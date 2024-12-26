import React, { memo } from "react";
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
              <Text style={styles.deleteButtonText}>Sil</Text>
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
