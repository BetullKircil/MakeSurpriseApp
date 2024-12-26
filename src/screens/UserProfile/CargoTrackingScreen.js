import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const CargoTrackingScreen = ({ navigation }) => {
  const [activeStatus, setActiveStatus] = useState(1);

  const statuses = [
    "Hazırlanıyor",
    "Kargoya Verildi",
    "Dağıtımda",
    "Teslim Edildi"
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{"←"} Kargo Takibi</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Image
          source={require("@/assets/images/cargoTracking.png")}
          style={styles.logo}
        />

        <View style={styles.progressLabels}>
          {statuses.map((status, index) => (
            <View key={index} style={styles.statusWrapper}>
              <Text style={[styles.label, activeStatus === index && styles.activeLabel]}>
                {status}
              </Text>
              <View
                style={[
                  styles.circle,
                  activeStatus === index && styles.activeCircle
                ]}
              />
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Sipariş Detayları :</Text>

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Teslim Edilecek Adres ve Alıcı Bilgileri</Text>
        <View style={styles.addressSection}>
          <Text style={styles.name}>Eylül Ev</Text>
          <Text style={styles.recipient}>Eylül Öz</Text>
          <Text style={styles.phone}>505****12</Text>
          <Text style={styles.address}>
            Yeditepe Mah. Çamdib Sok. No: 8 Belkıs Evleri C Blok Kat:1 No:11
            Şahinbey/G.Antep
          </Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Fiyat Ve Ödeme Bilgileri</Text>
        <View style={styles.priceSection}>
          <Text style={styles.price}>279.99 TL</Text>
          <Text style={styles.paymentMethod}>Cüzdan ile Ödeme</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF2F8",
    padding: 16,
  },
  header: {
    backgroundColor: "#FFB703",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 40,
    marginBottom: 35,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  statusWrapper: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
  },
  activeLabel: {
    color: "#FFB703",
    fontWeight: "bold",
  },
  line: {
    width: 10,
    height: 1,
    backgroundColor: "#FFB703",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DDD",
  },
  activeCircle: {
    backgroundColor: "#FFB703",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5A189A",
    marginBottom: 10,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#5A189A",
  },
  addressSection: {
    borderTopWidth: 1,
    borderColor: "#DDD",
    paddingTop: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5A189A",
  },
  recipient: {
    fontSize: 12,
    color: "#333",
  },
  phone: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
    color: "#555",
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  paymentMethod: {
    fontSize: 12,
    color: "#5A189A",
  },
});

export default CargoTrackingScreen;
