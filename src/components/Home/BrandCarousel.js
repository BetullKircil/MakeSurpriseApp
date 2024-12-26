import React from "react";
import { ScrollView, Image, StyleSheet } from "react-native";

const BrandCarousel = () => {
  const brands = Array(12).fill(require("@/assets/images/anonymous-person.png")); 

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
    width: 60,
    height: 60,
    marginHorizontal: 5,
  },
});
