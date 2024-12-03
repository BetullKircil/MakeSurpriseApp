import React, {useState} from 'react';
import Loading from "../../src/components/Loading"
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'

const SignupScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isButtonDisabled = 
    !isChecked || 
    email.trim() === '' || 
    password.trim() === '' || 
    firstName.trim() === '' || 
    lastName.trim() === '';

  const handleLogin = () => {
    const isEmailValid = emailRegex.test(email.trim()); 
    setIsEmailValid(isEmailValid);
    setIsEmailTouched(true); 

    if (!isEmailValid) {
      return; 
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt</Text>
      {isLoading && <Loading />}
      <Image
        source={require('@/assets/images/signup-person.png')} 
        style={styles.logo}
      />
      <TextInput
        placeholder="Ad" 
        style={styles.input}
        onChangeText={(value) => setFirstName(value)}
      />
      <TextInput
        placeholder="Soyad"
        style={styles.input}
        onChangeText={(value) => setLastName(value)}
      />
      <TextInput 
        onChangeText={(value) => setEmail(value)}
        placeholder="E-mail" 
        style={[styles.input, { borderColor: !isEmailValid && isEmailTouched ? 'red' : '#ddd' }]} 
        onFocus={() => setIsEmailTouched(true)}
      />
      {!isEmailValid && isEmailTouched && (
        <Text style={styles.errorText}>Geçersiz e-mail formatı.</Text>
      )}
      <TextInput
        placeholder="Şifre"
        secureTextEntry={!showPassword} 
        style={styles.input}
        onChangeText={(value) => setPassword(value)}
      />
      <View style={styles.policyContainer}>
        <CheckBox
          style={styles.checkboxStyle}
          onClick={() => setIsChecked(!isChecked)}
          isChecked={isChecked}
        />
        <Text style={styles.policyText}>Gizlilik politikasını okudum ve onaylıyorum</Text>
      </View>
      <TouchableOpacity
        style={[styles.registerButton, { opacity: isButtonDisabled ? 0.5 : 1 }]}
        onPress={handleLogin}
        disabled={isButtonDisabled} 
      >
        <Text style={styles.buttonText}>Kaydol</Text>
      </TouchableOpacity>
      <View style={styles.alreadyHaveAccountContainer}>
        <Text style={styles.alreadyHaveAccountText}>Zaten Bir Hesabın Var mı?</Text>
        <Text style={styles.registerText} onPress={() => navigation.navigate('Login')}>
          Giriş Yap
        </Text>
      </View>
    </View>
  );
};


export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eedaf0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
  chekboxStyle: {
    color: '#fff',
    paddingHorizontal: 5,
    marginLeft: -10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
    color: '#8A2BE2'
  },
  registerText:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#42b3f5',
    marginBottom: -50,
    paddingHorizontal: 10
  },
  errorText: {
    color: 'red',
    marginTop: -10,
    marginRight: 180,
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
  registerButton: {
    backgroundColor: '#8A2BE2',
    padding: 10,
    borderRadius: 18,
    marginRight: 10,
    width: '85%',
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  policyText: {
    color: '#fff',
    fontSize: 13,
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
    alignItems: 'start',
    textAlign: 'start',
    marginTop: -20,
    padding: 20
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  alreadyHaveAccountText: {
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
});

