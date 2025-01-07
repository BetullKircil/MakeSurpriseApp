import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform ,
  BackHandler 
} from 'react-native';
import BottomBarNavigation from "../../components/common/BottomBarNavigation";
import useAsyncStorage from '../../helper/useAsyncStorage';
import {ipConfig} from "../../../scripts/enums"

const UserCustomizeSurpriseScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [budget, setBudget] = useState('');
  const [note, setNote] = useState('');
  const isButtonDisabled = !budget;
  const [selectedMenu, setSelectedMenu] = useState('shopping');

  useEffect(() => {
    const handleBackPress = () => {
      navigation.navigate('HomePageScreen');
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, [navigation]);

  const { getData } = useAsyncStorage();

  const handleNavigate = async () => {
    const UserId = Number(await getData("userID"));
    // navigation.navigate('OrderSummaryScreen', { budget, note });
    const response = await fetch(`${ipConfig}Shopping/AddProduct` , 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          UserId: UserId,
          UserRelativeId: user,
          Price: budget,
          Note: note
        }
      )
    }
  )
  if(response.ok){
    navigation.navigate('OrderSummaryScreen')
  }
  };

  const handleMenuActivity = (menu) => {
    setSelectedMenu(menu); 
    navigation.navigate(menu);
  };

  return (
    <View style={styles.containerWithBottomBar}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerWithBottomBar}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.header}>Sürprizini Özelleştir</Text>
            <Image 
              source={require('@/assets/images/surpriseBasket.png')} 
              style={styles.image}
            />
            <View style={styles.budgetContainer}>
              <Text style={styles.budgetLabel}>Bütçeniz:</Text>
              <TextInput
                style={styles.budgetInput}
                keyboardType="phone-pad"
                placeholder="₺"
                value={budget}
                onChangeText={(text) => setBudget(text)}
              />
            </View>
            <View style={styles.noteContainer}>
              <Text style={styles.noteLabel}>Not:</Text>
              <TextInput 
                style={styles.noteInput} 
                multiline 
                placeholder="Buraya notunuzu yazın..."
                value={note}
                onChangeText={(text) => setNote(text)}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
              onPress={handleNavigate}  
              disabled={isButtonDisabled} 
            >
              <Text style={styles.buttonText}>Tamamla ve Sepete Ekle</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottombarStyle}>
        <BottomBarNavigation 
          selectedMenu={selectedMenu} 
          navigation={navigation} 
          onNavigate={handleMenuActivity} 
        />
      </View>
    </View>
  );
};

export default UserCustomizeSurpriseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eedaf0',
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  bottombarStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#eedaf0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    justifyContent: 'center',
  },
  containerWithBottomBar: {
    flex: 1,
    backgroundColor: '#eedaf0',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 30,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  budgetLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  budgetInput: {
    width: 100,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#d9a4f7',
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  noteContainer: {
    marginBottom: 20,
  },
  noteLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  noteInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3',  
  },
});
