import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomBarNavigation from "../../components/common/BottomBarNavigation";
import BrandCarousel from '../../components/Home/BrandCarousel';
import OptionBox from '../../components/Home/OptionBox';
import {homePageSurpriseForLovedOnes} from "../../../scripts/enums" 
import {homePageSurpriseForYourself} from "../../../scripts/enums"
import {appNameFirstPart} from "../../../scripts/enums"
import {appNameSecondPart} from "../../../scripts/enums"

const HomePageScreen = ({ navigation }) => {
  const [selectedMenu, setSelectedMenu] = useState("home");

  const handleNavigation = (menu) => {
    setSelectedMenu(menu); 
    navigation.navigate(menu);
  };

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
          text= {homePageSurpriseForLovedOnes.toUpperCase()}
          imageSource={require("@/assets/images/gift-to-sb.gif")}
          onPress={() =>
            navigation.navigate("MakeSurpriseForYourLovedScreen", {
              userRelativeType: false,
            })
          }
        />
        <OptionBox
          style={styles.optionStyle}
          text={homePageSurpriseForYourself.toUpperCase()}
          imageSource={require("@/assets/images/gift-yourself.gif")}
          onPress={() =>
            navigation.navigate("MakeSurpriseForYourself", {
              userRelativeType: true,
            })
          }
        />
      </View>
      <BottomBarNavigation selectedMenu={selectedMenu} navigation={navigation} onNavigate={handleNavigation}/>
    </View>
  );
};

export default HomePageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eedaf0",
  },
  appTitleStyle: {
    fontStyle: "italic",
    fontSize: 25,
    position: "absolute",
    top: 0,
    alignSelf: "center",
    marginTop: 45,
  },
  makeStyle: {
    color: "#FFF",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  surpriseStyle: {
    color: "#8A2BE2",
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
