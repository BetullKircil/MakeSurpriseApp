import React, { memo } from "react";
import { View, Modal, Text, TextInput, Button, StyleSheet } from "react-native";

const CalenderEventModal = ({ isVisible, onClose, onSave, eventTitle, setEventTitle }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Özel Gün Ekleyin</Text>
          <TextInput
            style={styles.input}
            placeholder={"Başlık girin"}
            value={eventTitle}
            onChangeText={setEventTitle}
          />
          <View style={styles.buttons}>
            <Button title="Kaydet" onPress={onSave} />
            <View style={styles.gap}></View>
            <Button title="İptal" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(CalenderEventModal);

const styles = StyleSheet.create({
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
  buttons: {
    flexDirection: "row",
  },
  gap: {
    width: 10,
  },
});
