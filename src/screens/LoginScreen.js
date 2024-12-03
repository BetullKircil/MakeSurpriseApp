import React, {useState} from 'react';
import Loading from "../../src/components/Loading"
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

const  HomeScreen = ({navigation}) =>{
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true); 
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const isButtonDisabled = email.trim() === '' || password.trim() === '';
  const handleLogin = () => {
    setIsEmailTouched(true);
    const isEmailValid = emailRegex.test(email.trim()); 
    const isPasswordValid = password.trim() !== '';
    
    setIsEmailValid(isEmailValid); 
    setIsPasswordValid(isPasswordValid); 
  
    if (!isEmailValid || !isPasswordValid) {
      return; 
    }
  
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    navigation.navigate('HomePageScreen')
  };
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Giriş</Text>
      {isLoading && <Loading />}
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
      {!isEmailValid && <Text style={styles.errorText}>Geçersiz email formatı.</Text>}

      <TextInput
          placeholder="Şifre"
          secureTextEntry={!showPassword} 
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
        />
        <View style={styles.loginWithSocialLinkContainer}>
        <Image
            source={require('@/assets/images/google-logo.png')}
            style={styles.googleLogo}
        />
        <Text style={styles.buttonText}> ile Giriş Yap</Text>
        </View>
        

      <TouchableOpacity
        style={[styles.loginButton, { opacity: email && password ? 1 : 0.5 }]}
        onPress={handleLogin}
        disabled={!email || !password} 
      >
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <View style={styles.policyContainer}>
        <Text style={styles.policyText}>
          Hesabın Yok mu?
        </Text>
        <Text style={styles.registerText} onPress={() => navigation.navigate('Signup')}>
          Kaydol
        </Text>
      </View>
    </View>
  );
}

export default HomeScreen;

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
  loginButton: {
    backgroundColor: '#8A2BE2',
    padding: 10,
    borderRadius: 18,
    marginRight: 10,
    width: '85%',
    alignItems: 'center',
    marginTop: 130
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
});
