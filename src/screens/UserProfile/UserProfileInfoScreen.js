import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Button, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import useAsyncStorage from '../../helper/useAsyncStorage';
import {ipConfig} from "../../../scripts/enums"

const UserProfileInfoScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [firstNameIcon, setFirstNameIcon] = useState(require('@/assets/images/noEdit.png'));

  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [lastNameIcon, setLastNameIcon] = useState(require('@/assets/images/noEdit.png'));

  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [phoneNumberIcon, setPhoneNumberIcon] = useState(require('@/assets/images/noEdit.png'));
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const { getData } = useAsyncStorage();

useEffect(() => {
 async function getAllUserProfile(){
      const userId = Number(await getData("userID"));
      const response = await fetch(`${ipConfig}UserProfile/GetUserInfo?userId=${userId}`)
      if(response.ok){
        const data = await response.json();
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setPhoneNumber(data.phoneNumber)
        console.log("data: ", data)
      }
 }
 getAllUserProfile()
}, [])

async function saveUserProfile(){
  const userId = Number(await getData("userID"));
  const response = await fetch(`${ipConfig}UserProfile/ChangeUserInfo`,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({UserId: userId, FirstName: firstName, LastName: lastName, PhoneNumber:phoneNumber})
    }
  )
  if(response.ok){
    const data = await response.json();
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setPhoneNumber(data.phoneNumber)
    console.log("data: ", data)
  }
}

  const handleEditFirstNamePress = () => {
    setFirstNameIcon(require('@/assets/images/edit.png'));
    setIsEditingFirstName(true);
    setIsSaveButtonDisabled(false);
  };

  const handleEditLastNamePress = () => {
    setLastNameIcon(require('@/assets/images/edit.png'));
    setIsEditingLastName(true);
    setIsSaveButtonDisabled(false);
  };

  const handleEditPhoneNumberPress = () => {
    setPhoneNumberIcon(require('@/assets/images/edit.png'));
    setIsEditingPhoneNumber(true);
    setIsSaveButtonDisabled(false);
  };

  const handleSaveChanges = () => {
    setIsModalVisible(true);
  };

  const handleModalSave = () => {
    saveUserProfile();
    setIsModalVisible(false);
    alert('Değişiklikler kaydedildi!');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    console.log('Değişiklikler kaydedilmedi');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>👤 Kullanıcı Bilgilerim</Text>
          </View>
          <Image
            source={require('@/assets/images/changeProfileInfoGif.png')}
            style={styles.profileImage}
          />
          <Text style={[styles.label, styles.boldLabel]}>Ad :</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Adınızı girin"
              value={firstName}
              onChangeText={setFirstName}
              editable={isEditingFirstName}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditFirstNamePress}
            >
              <Image
                source={firstNameIcon}
                style={styles.editInfoIcons}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.label, styles.boldLabel]}>Soy Ad :</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={lastName}
              placeholder="Soyadınızı girin"
              onChangeText={setLastName}
              editable={isEditingLastName}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditLastNamePress}
            >
              <Image
                source={lastNameIcon}
                style={styles.editInfoIcons}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.label, styles.boldLabel]}>Telefon numarası :</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Telefon numaranızı girin"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              editable={isEditingPhoneNumber}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditPhoneNumberPress}
            >
              <Image
                source={phoneNumberIcon}
                style={styles.editInfoIcons}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.saveButton, isSaveButtonDisabled && styles.disabledButton]}
            onPress={handleSaveChanges}
            disabled={isSaveButtonDisabled}
          >
            <Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Emin misiniz?</Text>
                <Text style={styles.modalText}>Değişiklikleri kaydetmek istediğinizden emin misiniz?</Text>
                <View style={styles.modalButtons}>
                  <Button title="Hayır" color="#ff0000" onPress={handleModalCancel} />
                  <Button title="Evet" onPress={handleModalSave} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eedaf0',
  },
  header: {
    backgroundColor: '#d9a4f7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  boldLabel: { fontWeight: 'bold' }, 
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  modalText: { fontSize: 16, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', paddingHorizontal: 20 },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  editInfoIcons: {
    width: 20,
    height: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8bff0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginLeft: 3,
    width: '50%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#333',
  },
  editIcon: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#ffa366',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfileInfoScreen;
