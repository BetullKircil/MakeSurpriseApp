import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddressDropdown from '../../components/Address/AddressDropdown';
import CustomCheckbox from '../../components/Order/CustomCheckbox';
import AddAddressButton from '../../components/Address/AddAddressButton';
import { createOrder, orderSummary } from '@/scripts/enums';


const OrderSummaryScreen = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isFocus, setIsFocus] = useState(false);const isOrderButtonDisabled = !selectedAddress || !isChecked || !budget || !note;


  const navigation = useNavigation();

  useEffect(() => {
    // const fetchAddresses = async () => {
    //   try {
    //     const response = await fetch('https://your-api-endpoint.com/addresses');
    //     const data = await response.json();
    //     setAddresses(data.map(item => ({
    //       id: item.id,
    //       label: item.title, 
    //     })));
    //   } catch (error) {
    //     console.error('Adresler alınırken hata oluştu:', error);
    //   }
    // };
    // fetchAddresses();
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{orderSummary}</Text>
      <View style={styles.summaryContainer}>
        <AddAddressButton onPress={() => navigation.navigate('UserAddressInfoScreen')} />
          {/* <Text style={styles.summaryText}>{budget}: ₺{budget}</Text>
          <Text style={styles.summaryText}>{note}: {note}</Text> */}
          <AddressDropdown
            addresses={addresses}
            selectedAddress={selectedAddress}
            onAddressChange={setSelectedAddress}/>
          <CustomCheckbox
            isChecked={isChecked}
            onToggle={() => setIsChecked(!isChecked)}
            label="Siparişi Aktifleştir"/>
      </View>
      <TouchableOpacity
        style={[styles.orderButton, isOrderButtonDisabled && styles.orderButtonDisabled]}
        onPress={handleOrderCreation}
        disabled={isOrderButtonDisabled}>
        <Text style={styles.orderButtonText}>{createOrder}</Text>
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
    marginTop: 10,
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
  orderButtonDisabled: {
    backgroundColor: '#cccccc',
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