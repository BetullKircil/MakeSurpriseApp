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
    elevation: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1.5,
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
    color: "#7B1FA2",
    fontWeight: "bold",
    fontSize: 15,
    flexShrink: 1,
  },
});
