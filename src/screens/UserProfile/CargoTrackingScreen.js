import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler, FlatList } from "react-native";
import useAsyncStorage from '../../helper/useAsyncStorage';
import { ipConfig } from "../../../scripts/enums";

const CargoTrackingScreen = ({ navigation }) => {
  const [cargoData, setCargoData] = useState([]);

  const statuses = [
    "Hazırlanıyor",
    "Kargoya Verildi",
    "Dağıtımda",
    "Teslim Edildi"
  ];

  const { getData } = useAsyncStorage();

  useEffect(() => {
    const handleBackPress = () => {
      navigation.navigate('UserProfileScreen');
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    async function getAllCargoInfo() {
      const userId = Number(await getData("userID"));
      const response = await fetch(`${ipConfig}UserProfile/GetAllCargos?userId=${userId}`);
      const data = await response.json();
      console.log("kargo takibi: ", data);
      console.log("Cargo Data Length: ", data["$values"] ? data["$values"].length : "No Data");
      setCargoData(data["$values"] || []);
    }
    getAllCargoInfo();
  }, []);
  

  return (
    cargoData.length === 0 ? (
      <View style={styles.emptyContainer}>
        <Image
          source={require("@/assets/images/no-cargo.png")}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>Kargo Bilgisi Bulunamadı</Text>
        <Text style={styles.emptyDescription}>
          Şu anda herhangi bir kargo bilgisi bulunmamaktadır. Lütfen daha sonra tekrar kontrol edin.
        </Text>
        <TouchableOpacity 
          style={styles.goBackButton} 
          onPress={() => navigation.navigate("HomePageScreen")}
        >
          <Text style={styles.goBackButtonText}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Kargo Takibi</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Sipariş Detayları :</Text>
        <FlatList
  data={cargoData}
  extraData={cargoData}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => {
    console.log(item); 
    return (
      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Teslim Edilecek Adres ve Alıcı Bilgileri</Text>
        <View style={styles.addressSection}>
        <Text style={styles.recipient}>
          <Text style={styles.recipientLabel}>Kime:</Text> {item.userRelative.firstName} {item.userRelative.lastName}
        </Text>
        <Text style={styles.phone}>
          <Text style={styles.phoneLabel}>Numarası:</Text> {item.userRelative.phoneNumber}
        </Text>
          <Text style={styles.name}>{item.address?.addressTag || 'Adres Etiketi Yok'}</Text>
          <Text style={styles.address}>{item.address?.district?.sehirAdi + "/ " + item.address?.district?.ilceAdi || 'Şehir Bilgisi Yok'}</Text>
          {/* <Text style={styles.address}>{item.address?.district?.ilceAdi || 'İlçe Bilgisi Yok'}</Text> */}
          <Text style={styles.address}>{item.address?.fullAddress || 'Adres Bilgisi Yok'}</Text>
        </View>

        <Text style={styles.cardTitle}>Fiyat ve Ödeme Bilgileri</Text>
        <View style={styles.priceSection}>
          <Text style={styles.price}>{item.price || 'Bütçe Bilgisi Yok'} TL</Text>
          <Text style={styles.paymentMethod}>Cüzdan ile Ödeme</Text>
        </View>

        <View style={styles.statusWrapper}>
          <Text style={styles.label}>Durum: Hazırlanıyor</Text>
          <View style={[styles.circle, { backgroundColor: "#FFB703" }]} />
        </View>
      </View>
    );
  }}
/>

      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF2F8",
    padding: 16,
  },
  recipient: {
    fontSize: 15, 
    fontWeight: '500',
    color: '#333',  
  },
  recipientLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: 'blue', 
  },
  phone: {
    fontSize: 15, 
    color: '#555', 
    marginBottom: 10,
  },
  phoneLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: 'blue', 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: "#7B1FA2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  goBackButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5A189A",
    marginBottom: 10,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#F9F9F9",
  },
  cardTitle: {
    fontSize: 16,
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
  address: {
    fontSize: 12,
    color: "#555",
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
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
  statusWrapper: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginRight: 10,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFB703",
  },
});

export default CargoTrackingScreen;
