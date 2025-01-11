import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddressDropdown from '../../components/Address/AddressDropdown';
import CustomCheckbox from '../../components/Order/CustomCheckbox';

const ShoppingItem = ({ item, addressList, onOrderUpdate }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

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

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryText}>{item.userRelativeTag}</Text>
      <Text style={styles.summaryText}>
        {item.userRelativeFirstName + " " + item.userRelativeLastName}
      </Text>
      <Text style={styles.summaryText}>{item.shoppingCartNote}</Text>
      <Text style={styles.summaryText}>{item.shoppingCartPrice} TL</Text>
      <AddressDropdown
        addresses={addressList}
        selectedAddress={selectedAddress}
        onAddressChange={setSelectedAddress}
      />
      <CustomCheckbox
        isChecked={isChecked}
        onToggle={handleToggleCheckbox}
        label="Siparişi Aktifleştir"
      />
    </View>
  );
};

export default ShoppingItem;

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: '#e6e6fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
