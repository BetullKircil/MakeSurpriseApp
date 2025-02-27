import React, {useState} from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {invalidMailError, ipConfig, loginError, signup} from "../../../scripts/enums"
import { ActivityIndicator, ScrollView,
  KeyboardAvoidingView,
  Platform, } from 'react-native';


const  HomeScreen = ({navigation}) =>{
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  };

  async function resetPassword(){
    navigation.navigate("ForgotPasswordScreen");
  }
  async function handleLogin() {
    setIsEmailTouched(true);
    const isEmailValid = emailRegex.test(email.trim()); 
    const isPasswordValid = password.trim() !== '';
    
    setIsEmailValid(isEmailValid); 
    setIsPasswordValid(isPasswordValid); 
  
    if (!isEmailValid || !isPasswordValid) {
      return; 
    }

    setIsLoading(true);
    const requestData = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch(`${ipConfig}Auth/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        await storeData("userID", data.user.userId.toString());
        navigation.navigate('HomePageScreen');
      } else {
        setErrorMessage(loginError);
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
      {isLoading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Giriş</Text>
          <Image
            source={require('@/assets/images/login-person.png')} 
            style={styles.logo}
          />
          <TextInput 
            onChangeText={(value) => setEmail(value)}
            placeholder="E-mail" 
            style={[styles.input, { borderColor: !isEmailValid && isEmailTouched ? 'red' : '#ddd' }]} 
            onFocus={() => setIsEmailTouched(true)}
          />
          {!isEmailValid && <Text style={styles.errorText}>{invalidMailError}</Text>}

          <TextInput
            placeholder="Şifre"
            secureTextEntry={!showPassword} 
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
          />
          {errorMessage !== '' && <Text style={styles.stackErrorMessageText}>{errorMessage}</Text>}

          <Text style={styles.resetPasswordText} onPress={() => resetPassword()}>
            Şifremi Unuttum
          </Text>

          <TouchableOpacity
            style={[styles.loginButton, { opacity: email && password ? 1 : 0.5 }]}
            onPress={handleLogin}
            disabled={!email || !password} 
          >
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>

          <View style={styles.policyContainer}>
            <Text style={styles.policyText}>Hesabın Yok mu?</Text>
            <Text style={styles.registerText} onPress={() => navigation.navigate('Signup')}>
              {signup}
            </Text>
          </View>
        </>
      )}
    </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 40,
    marginBottom: 35,
  },
  icon: {
    width: 20, 
    height: 20,
    marginLeft: 250,
    marginTop: -45
  },
  loginWithSocialLinkContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 50,
  },
  googleLogo: {
    width: 35, 
    height: 35, 
    marginRight: 10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
    color: "#7B1FA2",
  },
  registerText:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#42b3f5',
    color: "#7B1FA2",
    marginBottom: -50,
    paddingHorizontal: 10
  },
  resetPasswordText:{
    fontSize: 13,
    fontWeight: 'medium',
    color: 'red',
    marginBottom: -50,
    paddingHorizontal: 10,
    textDecorationLine: "underline"
  },
  errorText: {
    color: 'red',
    marginTop: -10,
    marginRight: 180,
    fontSize: 10,
    marginBottom: 10
  },
  stackErrorMessageText:{
    color: 'red',
    marginTop: -5,
    marginRight: 95,
    fontSize: 10,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc', 
  },
  loginButton: {
    backgroundColor: '#7B1FA2',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: '85%',
    alignItems: 'center',
    marginTop: 130
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "bold"
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
  policyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  policyText: {
    marginLeft: 10,
    color: '#333',
    marginBottom: -50
  },
  submitButton: {
    backgroundColor: '#FF7F50',
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  submitButtonText: {
    fontSize: 28,
    color: '#fff',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
