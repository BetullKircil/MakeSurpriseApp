import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const DirectOrdersScreen = ({ visible, onConfirm, onCancel, specialDayTitle }) => (
  <Modal transparent={true} visible={visible} animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Yaklaşan Özel Gününüz Var</Text>
        <Image
            source={require('@/assets/images/sendGiftGif.gif')} 
            style={styles.logo}
          />
        <Text style={styles.modalMessage}>
          Takviminize eklediğiniz{' '}
          <Text style={{ color: 'blue', fontWeight: 'bold' }}>{specialDayTitle}</Text> özel günü yaklaşıyor! Hemen profil oluşturup hediye gönderin
        </Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
            <Text style={styles.modalButtonText}>Daha Sonra</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={onConfirm}>
            <Text style={styles.modalButtonText}>Hediye Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalMessage: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  confirmButton: { backgroundColor: '#8A2BE2' },
  modalButtonText: { color: 'white', fontWeight: 'bold' },
});

export default DirectOrdersScreen;
