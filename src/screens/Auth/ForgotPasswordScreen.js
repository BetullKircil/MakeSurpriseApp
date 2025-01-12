import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import {ipConfig} from "../../../scripts/enums"

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const sendVerificationCode = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    console.log("dogrulama kodu gonderilecek");
    setIsLoading(true);
    const requestData = {
      ToMail: email,
    };
    console.log("requestData: ", requestData);
    try {
      const response = await fetch(`${ipConfig}Mail/SendVerificationCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const data = await response.json();
        setIsEmailSent(true);
        setSuccessMessage(data.message);
        console.log("başarıyla gönderildi");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Bir hata oluştu.');
        console.log("başarıyla gönderilmedi");
      }
    } catch (error) {
      setErrorMessage('Hata');
    } finally {
      setIsLoading(false);
    }
  };
  

  const verifyCode = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);
    try {
      const response = await fetch(`${ipConfig}Mail/VerifyResetCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Code: code }),
      });

      if (response.ok) {
        setIsCodeValid(true);
        setSuccessMessage('Doğrulama kodu doğru.');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Kod yanlış.');
      }
    } catch (error) {
      setErrorMessage('Bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Şifreler uyuşmuyor.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${ipConfig}Auth/ResetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          NewPassword: newPassword,
          Code: code,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Şifre başarıyla değiştirildi.');
        navigation.navigate('HomeScreen');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Bir hata oluştu.');
      }
    } catch (error) {
      setErrorMessage('Bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  async function ResetPasswordAsync() {
    setErrorMessage('');
    setSuccessMessage('');
    console.log("sifre degistirmek icin girdi")
    if (newPassword !== confirmPassword) {
        setErrorMessage('Şifreler uyuşmuyor.');
        console.log("Şifreler uyuşmuyor")
        return;
      }
      console.log("email: ", email)
      console.log("newPassword: ", newPassword)
    const response = await fetch(`${ipConfig}UserProfile/ResetPassword`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            Email: email,
            NewPassword: newPassword,
        })
    });
    if (response.ok) {
        alert('Şifreniz başarıyla değiştirildi!');
        console.log("Şifre başarılı bir şekilde değiiştirildi")
        navigation.navigate('Login');
    } else {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
}
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {!isEmailSent ? (
            <>
              <Text style={styles.title}>Şifremi Unuttum</Text>
              <Image
                    source={require('@/assets/images/resetPassword.png')} 
                    style={styles.logo}
                />
              <TextInput
                placeholder="E-posta"
                style={styles.input}
                value={email}
                onChangeText={(value) => setEmail(value)}
              />
              <TouchableOpacity style={styles.button} onPress={sendVerificationCode}>
                <Text style={styles.buttonText}>Doğrulama Kodu Gönder</Text>
              </TouchableOpacity>
            </>
          ) : !isCodeValid ? (
            <>
              <Text style={styles.title}>Kod Doğrulama</Text>
              <TextInput
                placeholder="Doğrulama Kodu"
                style={styles.input}
                value={code}
                onChangeText={(value) => setCode(value)}
              />
              <TouchableOpacity style={styles.button} onPress={verifyCode}>
                <Text style={styles.buttonText}>Kodu Doğrula</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Yeni Şifre Belirle</Text>
              <TextInput
                placeholder="Yeni Şifre"
                style={styles.input}
                secureTextEntry
                value={newPassword}
                onChangeText={(value) => setNewPassword(value)}
              />
              <TextInput
                placeholder="Yeni Şifre (Tekrar)"
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
              />
              <TouchableOpacity style={styles.button} onPress={ResetPasswordAsync}>
                <Text style={styles.buttonText}>Şifreyi Sıfırla</Text>
              </TouchableOpacity>
            </>
          )}
          {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
          {successMessage !== '' && <Text style={styles.successText}>{successMessage}</Text>}
        </>
      )}
    </View>
  );
};

const styles = {
container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    },
  title: {
    color: "#7B1FA2",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 150,
    marginTop: -130
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 13,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#7B1FA2',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 40,
    marginBottom: 35,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
};

export default ForgotPasswordScreen;
