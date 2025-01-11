import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const AddressDropdown = ({ addresses, selectedAddress, onAddressChange }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
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
          onAddressChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: 'white',
    marginLeft: -2,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
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
});

export default AddressDropdown;
