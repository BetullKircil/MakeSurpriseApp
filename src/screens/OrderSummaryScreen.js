import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

const OrderSummaryScreen = ({ route }) => {
  const { budget, note } = route.params;
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchedAddresses = [
      { id: '1', label: 'Adres 1' },
      { id: '2', label: 'Adres 2' },
      { id: '3', label: 'Adres 3' },
    ];
    setAddresses(fetchedAddresses);
  }, []);

  const handleAddressChange = (selectedItem) => {
    setSelectedAddress(selectedItem);
  };

  const handleOrderCreation = () => {
    if (!selectedAddress) {
      Alert.alert('Hata', 'Lütfen bir adres seçin.');
      return;
    }

    if (!isChecked) {
      Alert.alert('Hata', 'Lütfen siparişi aktifleştirin.');
      return;
    }

    Alert.alert('Başarılı', 'Sipariş başarıyla oluşturuldu!');
    // Sipariş oluşturma işlemi burada yapılabilir.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sipariş Özeti</Text>
      <View style={styles.summaryContainer}>
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => navigation.navigate('UserAddressInfoScreen')}
        >
          <Text style={styles.addAddressButtonText}>+ Adres Ekle</Text>
        </TouchableOpacity>
        <Text style={styles.summaryText}>Bütçe: ₺{budget}</Text>
        <Text style={styles.summaryText}>Not: {note}</Text>

        <Text style={styles.dropdownLabel}>Adres Seçin:</Text>
        {addresses.length > 0 ? (
          <SelectDropdown
            data={addresses.map((address) => address.label)}
            onSelect={(selectedItem) => handleAddressChange(selectedItem)}
            buttonTextAfterSelection={(selectedItem) => selectedItem || 'Adres Seçiniz'}
            rowTextForSelection={(item) => item}
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={styles.dropdownButtonText}
            dropdownStyle={styles.dropdown}
            defaultButtonText="Adres Seçiniz"
          />
        ) : (
          <Text style={styles.noAddressText}>Adres ekleyiniz</Text>
        )}

        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Siparişi Aktifleştir</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.orderButton} onPress={handleOrderCreation}>
        <Text style={styles.orderButtonText}>Sipariş Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#eedaf0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summaryContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    position: 'relative',
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdownButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    borderRadius: 8,
  },
  noAddressText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  addAddressButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#8A2BE2',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  addAddressButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  orderButton: {
    width: '100%',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
