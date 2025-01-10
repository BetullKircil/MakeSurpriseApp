import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Button, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import useAsyncStorage from '../../helper/useAsyncStorage';
import {ipConfig, phoneNumberFormatError} from "../../../scripts/enums"

const UserProfileInfoScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [firstNameIcon, setFirstNameIcon] = useState(require('@/assets/images/noEdit.png'));

  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [lastNameIcon, setLastNameIcon] = useState(require('@/assets/images/noEdit.png'));

  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [phoneNumberIcon, setPhoneNumberIcon] = useState(require('@/assets/images/noEdit.png'));
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const { getData } = useAsyncStorage();

  const changePhoneNumberHandle = (value) => {
    let rawValue = value.replace(/\D/g, "");
        setErrorMessage(null);
    let formattedValue = "";
    if (rawValue.startsWith("0")) {
        if (rawValue.length <= 11) {
            formattedValue = rawValue
                .replace(/(\d{1})(\d{0,3})/, "$1 $2")
                .replace(/(\d{1} \d{3})(\d{0,3})/, "$1 $2")
                .replace(/(\d{1} \d{3} \d{3})(\d{0,2})/, "$1 $2")
                .replace(/(\d{1} \d{3} \d{3} \d{2})(\d{0,2})/, "$1 $2");
        } else {
            setErrorMessage(phoneNumberFormatError);
            formattedValue = value; 
        }
    } else {
        if (rawValue.length <= 10) {
            formattedValue = rawValue
                .replace(/(\d{0,3})/, "$1")
                .replace(/(\d{3})(\d{0,3})/, "$1 $2")
                .replace(/(\d{3} \d{3})(\d{0,2})/, "$1 $2")
                .replace(/(\d{3} \d{3} \d{2})(\d{0,2})/, "$1 $2");
        } else {
            setErrorMessage(phoneNumberFormatError);
            formattedValue = value; 
        }
    }
    setPhoneNumber(formattedValue);
};

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
    getAllUserProfile()
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

  const handlePhoneNumberChange = (value) => {
    changePhoneNumberHandle(value);
  };
  
  const handleSaveChanges = () => {
    setIsModalVisible(true);
    setIsEditingFirstName(false);
    setIsEditingLastName(false);
    setIsEditingPhoneNumber(false);
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
            <Text style={styles.headerText}>Kullanıcı Bilgilerim</Text>
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
          <Text style={[styles.label, styles.boldLabel]}>Soyad :</Text>
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
              onChangeText={handlePhoneNumberChange}
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
          {errorMessage !== '' && <Text style={styles.stackErrorMessageText}>{errorMessage}</Text>}
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
    backgroundColor: '#f7f7f7',
  },
  header: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  stackErrorMessageText:{
    color: 'red',
    marginTop: -5,
    marginRight: 95,
    fontSize: 10,
    marginBottom: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1FA2',
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
    width: 150,
    height: 150,
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
  },
  editIcon: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: "#7B1FA2",
    paddingVertical: 14,
    borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfileInfoScreen;
