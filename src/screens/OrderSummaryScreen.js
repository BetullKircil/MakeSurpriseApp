import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

const OrderSummaryScreen = ({ route }) => {
  const { budget, note } = route.params;
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isFocus, setIsFocus] = useState(false);const isOrderButtonDisabled = !selectedAddress || !isChecked || !budget || !note;


  const navigation = useNavigation();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/addresses');
        const data = await response.json();
        setAddresses(data.map(item => ({
          id: item.id,
          label: item.title, 
        })));
      } catch (error) {
        console.error('Adresler alınırken hata oluştu:', error);
      }
    };
    fetchAddresses();
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

-       <View style={styles.dropdownContainer}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={addresses} 
                maxHeight={300}
                labelField="label" 
                valueField="id" 
                placeholder={!isFocus ? 'Adres Seçiniz' : '...'}
                searchPlaceholder="Arama yapın..."
                value={selectedAddress} 
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setSelectedAddress(item.id);
                    setIsFocus(false);
                }}
                />
        </View>
        
        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Siparişi Aktifleştir</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.orderButton, isOrderButtonDisabled && styles.orderButtonDisabled]}
        onPress={handleOrderCreation}
        disabled={isOrderButtonDisabled}
        >
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
    marginTop: 10
  },
  summaryContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    position: 'relative',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    paddingVertical: 5,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  orderButtonDisabled: {
    backgroundColor: '#cccccc',
  },  
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    marginLeft: -2
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
