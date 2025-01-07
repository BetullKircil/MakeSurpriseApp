import React from "react";
import { ScrollView, Image, StyleSheet } from "react-native";

const BrandCarousel = () => {
  const brands = [
    require("@/assets/images/adidas.png"),
    require("@/assets/images/beko.png"),
    require("@/assets/images/burberry.png"),
    require("@/assets/images/holzinger.png"),
    require("@/assets/images/under-armour.png"),
    require("@/assets/images/mekan-moda.png"),
    require("@/assets/images/chanel.png"),
    require("@/assets/images/lacoste.png"),
    require("@/assets/images/lumberjack.png"),
    require("@/assets/images/nike.png"),
    require("@/assets/images/samsung.png"),
    require("@/assets/images/slazenger.png"),
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {brands.map((imageSource, index) => (
        <Image key={index} source={imageSource} style={styles.brandLogo} />
      ))}
    </ScrollView>
  );
};

export default BrandCarousel;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  brandLogo: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 40,
  },
});
