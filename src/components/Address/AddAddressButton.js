import { addAddress } from '@/scripts/enums';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddAddressButton = ({ onPress }) => (
  <TouchableOpacity style={styles.addAddressButton} onPress={onPress}>
    <Text style={styles.addAddressButtonText}>{addAddress}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});

export default AddAddressButton;
