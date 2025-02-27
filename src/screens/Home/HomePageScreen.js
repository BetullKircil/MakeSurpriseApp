import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import BottomBarNavigation from "../../components/common/BottomBarNavigation";
import BrandCarousel from '../../components/Home/BrandCarousel';
import OptionBox from '../../components/Home/OptionBox';
import {homePageSurpriseForLovedOnes} from "../../../scripts/enums" 
import {homePageSurpriseForYourself} from "../../../scripts/enums"
import {appNameFirstPart} from "../../../scripts/enums"
import {appNameSecondPart} from "../../../scripts/enums"
import * as SignalR from '@microsoft/signalr';
import {ipConfig} from "../../../scripts/enums"
import DirectOrdersScreen from '../../components/UserProfile/DirectOrdersScreen';


const HomePageScreen = ({ navigation }) => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [notification, setNotification] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [specialDayTitle, setSpecialDayTitle] = useState("");

  const handleNavigation = (menu) => {
    setSelectedMenu(menu); 
    navigation.navigate(menu);
  };
  useEffect(() => {
    console.log("logoutModalVisible: ", logoutModalVisible)
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

  useEffect(() => {
    console.log("logoutModalVisible: ", logoutModalVisible)
    const connection = new SignalR.HubConnectionBuilder()
      .withUrl(`${ipConfig}specialDaysHub`)  
      .configureLogging(SignalR.LogLevel.Information)
      .build();
    connection.on("receiveNotification", (message) => {
      
      if(!logoutModalVisible){
        setSpecialDayTitle(message);
        setLogoutModalVisible(true)
      }
      console.log('Notification:', message);
    });
    connection.start()
      .then(() => {
        console.log("SignalR Connected");
      })
      .catch((err) => {
        console.log("SignalR Connection Error: ", err);
        setTimeout(() => connection.start().catch(err => console.log("SignalR Retry Error: ", err)), 1000);
      });
    connection.onclose(() => {
      console.log('SignalR bağlantısı kesildi. Yeniden bağlanıyor...');
      setTimeout(() => {
        connection.start().catch(err => console.log('SignalR Reconnect Error: ', err));
      }, 50);
    });
    return () => {
      connection.stop();
    };

  }, [logoutModalVisible]);

  return (
    <View style={styles.container}>
      <Text style={styles.appTitleStyle}>
        <Text style={styles.makeStyle}>{appNameFirstPart}</Text>
        <Text style={styles.surpriseStyle}>{appNameSecondPart}</Text>
      </Text>
      <View style={styles.scrollableContainer}>
        <BrandCarousel />
      </View>

      <View style={styles.optionsContainer}>
        <OptionBox
          text= {homePageSurpriseForLovedOnes}
          imageSource={require("@/assets/images/gift-to-sb.gif")}
          onPress={() =>
            navigation.navigate("MakeSurpriseForYourLovedScreen", {
              userRelativeType: false,
            })
          }
        />
        <OptionBox
          style={styles.optionStyle}
          text={homePageSurpriseForYourself}
          imageSource={require("@/assets/images/gift-yourself.gif")}
          onPress={() =>
            navigation.navigate("MakeSurpriseForYourself", {
              userRelativeType: true,
            })
          }
        />
      </View>
      <DirectOrdersScreen
        visible={logoutModalVisible}
        specialDayTitle={specialDayTitle}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={() => {
          setLogoutModalVisible(false);
          navigation.navigate("OrderSummaryScreen", {
            userRelativeType: false,
          })
        }}
      />
      <BottomBarNavigation selectedMenu={selectedMenu} navigation={navigation} onNavigate={handleNavigation}/>
    </View>
  );
};

export default HomePageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f5f8",
  },
  appTitleStyle: {
    fontStyle: "italic",
    fontSize: 25,
    position: "absolute",
    top: 0,
    alignSelf: "center",
    marginTop: 45,
  },
  deneme:{
    color: "white"
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
  scrollableContainer: {
    marginTop: 115,
  },
  optionsContainer: {
    marginVertical: 120,
    paddingHorizontal: 15,
    height: 100,
    
  },
  optionStyle: {
    marginTop: 50,
  }
});
