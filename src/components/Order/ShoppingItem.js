import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddressDropdown from '../../components/Address/AddressDropdown';
import CustomCheckbox from '../../components/Order/CustomCheckbox';
import index from '@/app/(tabs)';

const ShoppingItem = ({ item, addressList, onOrderUpdate }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const navigation = useNavigation();

  const handleToggleCheckbox = () => {
    if (selectedAddress === "") {
      return;
    }

    setIsChecked((prev) => {
      if(selectedAddress !== ""){
            const newCheckedState = !prev;
        if (newCheckedState) {
            onOrderUpdate({
            ShoppingCartId: item.shoppingCartId,
            UserRelativeId: item.userRelativeId,
            GiftNote: item.shoppingCartNote,
            Price: item.shoppingCartPrice,
            AddressId: selectedAddress,
            });
        } else {
            onOrderUpdate(null, item.shoppingCartId);
        }
        return newCheckedState;
      }
      else{
        return false;
      }
    });
  };

  const handleAddAddressPress = () => {
    console.log("tıklandı")
    navigation.navigate('UserAddressInfoScreen'); 
  };

  return (
    <View style={styles.summaryContainer}>
      <TouchableOpacity
        onPress={handleAddAddressPress}
        style={styles.addAddressButton} 
      >
        <Text style={styles.addAddressButtonText}>Adres Ekle</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alıcı Bilgisi</Text>
        <Text style={styles.userInfoText}>
          {item.userRelativeFirstName} {item.userRelativeLastName} ({item.userRelativeTag})
        </Text>
      </View>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sipariş Notu</Text>
        <Text style={styles.noteText}>{item.shoppingCartNote || "Not bulunmuyor"}</Text>
      </View>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sipariş Fiyatı</Text>
        <Text style={styles.priceText}>{item.shoppingCartPrice} TL</Text>
      </View>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Teslimat Adresi</Text>
        <AddressDropdown
          addresses={addressList}
          selectedAddress={selectedAddress}
          onAddressChange={setSelectedAddress}
        />
      </View>
        <View style={styles.section}>
        <CustomCheckbox
          isChecked={isChecked}
          onToggle={handleToggleCheckbox}
          label="Siparişi Aktifleştir"
        />
      </View>
    </View>
  );
  
};

export default ShoppingItem;

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 5,
  },
  userInfoText: {
    fontSize: 14,
    color: '#333',
  },
  noteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32', 
  },
  addAddressButton: {
    backgroundColor: "#2E7D32",
    padding: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "#fff",
    flex: 1,
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  addAddressButtonText: {
    color: "#fff",
    textAlign: "center"
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
});
