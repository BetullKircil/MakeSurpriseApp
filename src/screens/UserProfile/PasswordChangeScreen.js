import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Button, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import useAsyncStorage from '../../helper/useAsyncStorage';
import { ipConfig } from "../../../scripts/enums";

const PasswordChangeScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingCurrentPassword, setIsEditingCurrentPassword] = useState(false);
  const [firstNameIcon, setFirstNameIcon] = useState(require('@/assets/images/noEdit.png'));
  const [isEditingNewPassword, setIsEditingNewPassword] = useState(false);
  const [lastNameIcon, setLastNameIcon] = useState(require('@/assets/images/noEdit.png'));
  const [isEditingPasswordAgain, setIsEditingPasswordAgain] = useState(false);
  const [phoneNumberIcon, setPhoneNumberIcon] = useState(require('@/assets/images/noEdit.png'));
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const { getData } = useAsyncStorage();

  useEffect(() => {
          const handleBackPress = () => {
            navigation.navigate('UserProfileScreen');
            return true; 
          };
      
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
          );
      
          return () => backHandler.remove();
        }, [navigation]);

  async function changePassword() {
    const userId = Number(await getData("userID"));
    const response = await fetch(`${ipConfig}UserProfile/ChangePassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserId: userId, OldPassword: currentPassword, NewPassword: newPassword })
    });
    console.log(response.status); 
    if (response.status == 200) {
      alert('Şifreniz değiştirildi!');
      navigation.navigate("UserProfileScreen")
    }
    else{
      alert('Eski şifre ve yeni şifre alanlarını doğru bir şekilde doldurunuz!');
    }
  }

  const handleEditCurrentPassword = () => {
    setFirstNameIcon(require('@/assets/images/edit.png'));
    setIsEditingCurrentPassword(true);
    setIsSaveButtonDisabled(false);
  };

  const handleEditNewPassword = () => {
    setLastNameIcon(require('@/assets/images/edit.png'));
    setIsEditingNewPassword(true);
    setIsSaveButtonDisabled(false);
  };

  const handleEditPasswordAgain = () => {
    setPhoneNumberIcon(require('@/assets/images/edit.png'));
    setIsEditingPasswordAgain(true);
    setIsSaveButtonDisabled(false);
  };

  const handleSaveChanges = () => {
    setIsModalVisible(true);
  };

  const handleModalSave = () => {
    setIsModalVisible(false);
    changePassword();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    console.log('Değişiklikler kaydedilmedi');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Şifre Değişikliği</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Mevcut Şifre:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mevcut Şifrenizi Girin"
              value={currentPassword}
              secureTextEntry={!showPassword}
              onChangeText={setCurrentPassword}
              editable={isEditingCurrentPassword}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditCurrentPassword}
            >
              <Image
                source={firstNameIcon}
                style={styles.editInfoIcons}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Yeni Şifre:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newPassword}
              secureTextEntry={!showPassword}
              placeholder="Yeni Şifrenizi Girin"
              onChangeText={setNewPassword}
              editable={isEditingNewPassword}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditNewPassword}
            >
              <Image
                source={lastNameIcon}
                style={styles.editInfoIcons}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Yeni Şifre(Tekrar):</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Yeni Şifrenizi Tekrar Girin"
              value={passwordAgain}
              secureTextEntry={!showPassword}
              onChangeText={setPasswordAgain}
              editable={isEditingPasswordAgain}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditPasswordAgain}
            >
              <Image
                source={phoneNumberIcon}
                style={styles.editInfoIcons}
              />
            </TouchableOpacity>
          </View>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B1FA2',
  },
  formContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  editIcon: {
    marginLeft: 10,
  },
  editInfoIcons: {
    width: 20,
    height: 20,
  },
  saveButton: {
    backgroundColor: "#7B1FA2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

export default PasswordChangeScreen;
