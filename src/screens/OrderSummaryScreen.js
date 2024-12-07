import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OrderSummaryScreen = ({ route }) => {
  const { budget, note } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sipariş Özeti</Text>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Bütçe: ₺{budget}</Text>
        <Text style={styles.summaryText}>Not: {note}</Text>
      </View>
    </View>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
