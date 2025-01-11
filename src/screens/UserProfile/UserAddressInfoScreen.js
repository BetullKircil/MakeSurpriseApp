import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import useAsyncStorage from '../../helper/useAsyncStorage';
import DeleteUserAddressModal from '../../components/UserProfile/DeleteUserAddressModal';
import { ipConfig } from "@/scripts/enums";

const UserAddressInfoScreen = ({navigation}) => {
  const [provinceValue, setProvinceValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [addressId, setAddressIdToDelete] = useState("");
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [fullAddressValue, setFullAddressValue] = useState("");
  const [addressTitleValue, setAddressTitleValue] = useState("");
  const [isFocusProvince, setIsFocusProvince] = useState(false);
  const [isFocusDistrict, setIsFocusDistrict] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const [isModalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "",
    name: "",
    phone: "",
    districtAndcity: "",
    details: "",
  });
  const { getData } = useAsyncStorage();
  
  const addAddress = async () => {
    if (
      addressTitleValue && fullAddressValue && provinceValue && districtValue
    ) {
      const UserId = Number(await getData("userID"));
      const response = await fetch(`${ipConfig}Address/AddAddress`, 
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({UserId: UserId, AddressTag: addressTitleValue, ProvinceId: provinceValue, DistrictId: districtValue, FullAddress: fullAddressValue, NeighbourhoodId: 1})
        }
      )
      if (response.ok) {
        Alert.alert(
          "Başarılı", 
          "Adres başarılı bir şekilde kaydedildi!", 
          [
            {
              text: "OK",
              onPress: () => {
                setAddressTitleValue("");
                setFullAddressValue("");
                setProvinceValue("");
                setDistrictValue("");
                getAllAddresses(); 
              }
            }
          ]
        );
      }
    }else {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
    }
  };
  
  async function getAllProvinces(){
    const response = await fetch(`${ipConfig}Address/GetAllProvinces`)
    const data = await response.json();
    const provincesData = data["$values"].map(province => {
      return (
        {
          label: province.sehirAdi,
          value: province.sehirId
        }
      )
    })
    setProvinces(provincesData)
  }
  async function getAllAddresses() {
    console.log("girdi")
    const UserId = Number(await getData("userID"));
    const response = await fetch(`${ipConfig}Address/GetAllAddresses?userId=${UserId}`)
    if(response.ok){
      const data = await response.json();
      setAddresses(data["$values"])
      console.log("new address data", data["$values"])
    }
  }

  useEffect(() => {
    getAllAddresses();
    getAllProvinces();
  }, [])

  function selectDistrictHandle(districtId) {
    console.log("districtId:", districtId)
    setDistrictValue(districtId)
  }
  async function selectProvinceHandle(provinceId){
    console.log(provinceId)
    setProvinceValue(provinceId)
    const response = await fetch(`${ipConfig}Address/GetAllDistricts?provinceId=${provinceId}`)
    const data = await response.json()
    const districtData = data["$values"].map(district => {
      return(
        {
          label: district.ilceAdi,
          value: district.ilceId
        }
      )
    })
    setDistricts(districtData);
  }

  const deleteAddress = async (addressId) => {
    const response = await fetch(`${ipConfig}Address/DeleteAddress?addressId=${addressId}`)
    if(response.ok){
      getAllAddresses();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Adres Defterim</Text>
      </View>
      <FlatList
      style={styles.addressContainer}
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.addressCard}>
            <Text style={styles.addressTitle}>{item.addressTag}</Text>
            <Text style={styles.addressText}>{item.sehirAdi + " / " + item.ilceAdi}</Text>
            <Text style={styles.addressText}>{item.fullAddress}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              // onPress={() => deleteAddress(item.addressId)}
              onPress={() => {
                setLogoutModalVisible(true)
                setAddressIdToDelete(item.addressId)
                }    
              }
            >
              <Text style={styles.deleteButtonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Yeni Adres Ekle +</Text>
        </TouchableOpacity>
          <DeleteUserAddressModal
            visible={logoutModalVisible}
            addressId={addressId}
            onCancel={() => setLogoutModalVisible(false)}
            onConfirm={() => {
              setLogoutModalVisible(false);
              deleteAddress(addressId);
            }}
          />
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni Adres Ekle</Text>
            <TextInput
              style={styles.input}
              placeholder="Başlık"
              value={addressTitleValue}
              onChangeText={(text) =>{
                setAddressTitleValue(text);
              }
              }
            />
            <View style={styles.dropdownContainer}>
              <Dropdown
                style={[styles.dropdown, isFocusProvince && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={provinces}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusProvince ? 'İl Seçiniz' : '...'}
                searchPlaceholder="Search..."
                // value={provinceValue}
                onFocus={() => setIsFocusProvince(true)}
                onBlur={() => setIsFocusProvince(false)}
                onChange={item => {
                  // setProvinceValue(prevProvince => item.label);
                  setIsFocusProvince(false);
                  selectProvinceHandle(item.value);
                }}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Dropdown
                style={[styles.dropdown, isFocusDistrict && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={districts}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusDistrict ? 'İlçe Seçiniz' : '...'}
                searchPlaceholder="Search..."
                // value={districtValue}
                onFocus={() => setIsFocusDistrict(true)}
                onBlur={() => setIsFocusDistrict(false)}
                onChange={item => {
                  // setDistrictValue(item.label);
                  selectDistrictHandle(item.value);
                  setIsFocusDistrict(false);
                }}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Açık Adres"
              value={fullAddressValue}
              onChangeText={ (text) => {
                setFullAddressValue(text);
                }
              }
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={
                  () => {
                    setModalVisible(false)
                    addAddress()
                  }
                  }
              >
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1FA2',
  },
  addButton: {
    backgroundColor: "#7B1FA2",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addressContainer: {
    marginTop: 15
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addressCard: {
    backgroundColor: '#e6e6fa',
    padding: 15,
    shadowColor: '#000',
    borderRadius: 8,
    elevation: 5,
    marginBottom: 25,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: "#666"
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#c21d1d",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 6
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#5b64e3",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ed0707",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdownContainer: {
    backgroundColor: 'white',
    paddingVertical: 5,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#636262"
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default UserAddressInfoScreen;
