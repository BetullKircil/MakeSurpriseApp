import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const MenuItem = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Image source={icon} style={styles.menuIcon} />
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: '#eedaf0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
});

export default MenuItem;
