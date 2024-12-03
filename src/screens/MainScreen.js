import React, {useState} from 'react';
import Loading from "../components/Loading"
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const MainScreen = ( {navigation} ) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <Text style={styles.appTitleStyle}>
        <Text style={styles.makeStyle}>Make</Text>
        <Text style={styles.surpriseStyle}>Surprise</Text>
      </Text>
      
      <Image
        source={require('@/assets/images/mainScreenSurpriseBox.png')} 
        style={styles.logo}
      />
      <Text style={styles.mainPageText}>Hey! Sen. Kendini ve sevdiklerini gizemli bir yolculuğa çıkarmaya hazır mısın? Hazırsan hadi başlayalım...</Text>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('SurveyScreen')}
      >
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Kaydol</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default MainScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eedaf0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  buttonContainer: {
    alignItems:'center',
    width: '100%',
    position: 'absolute', 
    bottom: 0,              
    alignSelf: 'center',
    marginBottom: 60
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: -100
  },
  icon: {
    width: 20, 
    height: 20,
    marginLeft: 250,
    marginTop: -45
  },
  loginButton: {
    // backgroundColor: '#8A2BE2',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    width: '85%',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,           
    borderColor: '#8A2BE2',
  },
  registerButton: {
    backgroundColor: '#8A2BE2',
    padding: 10,
    borderRadius: 18,
    marginRight: 10,
    width: '85%',
    alignItems: 'center',
    marginTop: 20,
  },
  makeStyle: {
    color: '#fff', 
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  surpriseStyle: {
    color: '#8A2BE2', 
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  mainPageText: {
    color: '#b54bdb',
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    paddingVertical: 20,
    textAlign: 'center'
  },
  appTitleStyle:{
    fontStyle:'italic',
    fontSize:25,
    position: 'absolute', 
    top: 0,              
    alignSelf: 'center',
    marginTop: 60
  }
});
