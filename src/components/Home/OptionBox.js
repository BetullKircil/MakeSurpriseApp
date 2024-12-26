import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";

const OptionBox = ({ text, imageSource, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default OptionBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#8A2BE2",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  text: {
    color: "#8A2BE2",
    fontWeight: "bold",
    fontSize: 15,
    flexShrink: 1,
  },
});
