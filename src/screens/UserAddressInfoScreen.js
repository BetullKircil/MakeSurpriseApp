import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";

const UserAddressInfoScreen = ({navigation}) => {
  const [addresses, setAddresses] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "",
    name: "",
    phone: "",
    districtAndcity: "",
    details: "",
  });

  const addAddress = () => {
    if (
      newAddress.title &&
      newAddress.name &&
      newAddress.phone &&
      newAddress.details &&
      newAddress.city
    ) {
      setAddresses([...addresses, newAddress]);
      setNewAddress({ title: "", name: "", phone: "", details: "", city: "" });
      setModalVisible(false);
    } else {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
    }
  };

  const deleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Adres Defterim</Text>
      </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Yeni Adres Ekle +</Text>
        </TouchableOpacity>

      <FlatList
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.addressCard}>
            <Text style={styles.addressTitle}>{item.title}</Text>
            <Text style={styles.addressText}>{item.name}</Text>
            <Text style={styles.addressText}>{item.phone}</Text>
            <Text style={styles.addressText}>{item.districtAndcity}</Text>
            <Text style={styles.addressText}>{item.details}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteAddress(index)}
            >
              <Text style={styles.deleteButtonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni Adres Ekle</Text>
            <TextInput
              style={styles.input}
              placeholder="Başlık"
              value={newAddress.title}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, title: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={newAddress.name}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Telefon"
              value={newAddress.phone}
              keyboardType="numeric"
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, phone: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="İl/İlçe"
              value={newAddress.districtAndcity}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, city: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Açık Adres"
              value={newAddress.details}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, details: text })
              }
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={addAddress}
              >
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eedaf0',
    padding: 20,
  },
  header: {
    backgroundColor: '#d9a4f7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 70,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addressCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: "#333",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#FF5722",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#5b64e3",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ed0707",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default UserAddressInfoScreen;
