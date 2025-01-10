import React, {useState, useEffect} from 'react';
import Loading from "../../components/common/Loading"
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { login, mainScreenWelcomeText, signup } from '@/scripts/enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorage from '../../helper/useAsyncStorage';

const MainScreen = ( {navigation} ) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [initialRoute, setInitialRoute] = useState(null);

  const { getData } = useAsyncStorage();

  useEffect(() => {
    
    const checkUserSession = async () => {
      const UserId = Number(await getData("userID"));
      try {
        const userToken = UserId; 
        console.log("UserIdd:", UserId)
        console.log("asil UserTokenn:", userToken)
        if(userToken != "" && userToken != null){
          navigation.navigate('HomePageScreen')
        }
      } catch (error) {
        console.error("Oturum kontrolü sırasında hata:", error);
      }
    };
    checkUserSession();
  }, []);  

    return (
      <View style={styles.container}>
        {isLoading && <Loading />}
        <Text style={styles.appTitleStyle}>
          <Text style={styles.makeStyle}>Make</Text>
          <Text style={styles.surpriseStyle}>Surprise</Text>
        </Text>
        
        <Image
          source={require('@/assets/images/givePresentByHand.png')} 
          style={styles.logo}
        />
        <Text style={styles.mainPageText}>{mainScreenWelcomeText}</Text>
  
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>{login}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupButtonText}>{signup}</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

export default MainScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
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
    borderRadius: 12,
    marginRight: 10,
    width: '85%',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,           
    borderColor: '#8A2BE2',
  },
  registerButton: {
    backgroundColor: '#7B1FA2',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: '85%',
    alignItems: 'center',
    marginTop: 20,
  },
  makeStyle: {
    color: "#D1C4E9",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  surpriseStyle: {
    color: "#7B1FA2",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  loginButtonText: {
    color: "#7B1FA2",
    fontSize: 16,
    fontWeight: 'bold'
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold'
  },
  mainPageText: {
    color: "#7B1FA2",
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
