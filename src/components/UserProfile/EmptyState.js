import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EmptyState = ({ onAddPress, userRelativeType }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Kaydedilmiş kullanıcı profili bulunamadı!</Text>
    <TouchableOpacity style={styles.addButton} onPress={() => onAddPress(userRelativeType)}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  </View>
);

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
