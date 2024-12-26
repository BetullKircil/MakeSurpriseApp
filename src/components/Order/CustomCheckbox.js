import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';

const CustomCheckbox = ({ isChecked, onToggle, label }) => (
  <View style={styles.checkboxContainer}>
    <CheckBox isChecked={isChecked} onClick={onToggle} style={styles.checkbox} />
    <Text style={styles.checkboxLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
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
});

export default CustomCheckbox;
