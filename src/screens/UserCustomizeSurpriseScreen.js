import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import BottomBarNavigation from "../components/BottomBarNavigation";

const UserCustomizeSurpriseScreen = ({ navigation }) => {
  const [budget, setBudget] = useState('');
  const [note, setNote] = useState('');
  const isButtonDisabled = !budget;

  const handleNavigate = () => {
    navigation.navigate('OrderSummaryScreen', { budget, note });
  };

  return (
    <View style={styles.containerWithBottomBar}>
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
            keyboardType="numeric"
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
      <BottomBarNavigation navigation={navigation} />
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
  containerWithBottomBar: {
    flex: 1,
    backgroundColor: '#eedaf0',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 20,
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
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#d9a4f7',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingBottom: -1,
    paddingTop: -1,
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
