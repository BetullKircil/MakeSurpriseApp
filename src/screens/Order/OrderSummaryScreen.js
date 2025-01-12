import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ShoppingItem from '../../components/Order/ShoppingItem';
import { createOrder, orderSummary } from '@/scripts/enums';
import BottomBarNavigation from "../../components/common/BottomBarNavigation";
import { ipConfig } from "../../../scripts/enums";
import useAsyncStorage from '../../helper/useAsyncStorage';

const OrderSummaryScreen = () => {
  const [order, setOrder] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("shopping");
  const [addressList, setAddressList] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const { getData } = useAsyncStorage();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAddresses = async () => {
      const UserId = Number(await getData("userID"));
      try {
        const response = await fetch(`${ipConfig}Shopping/GetAllShoppingDetails?userId=${UserId}`);
        const data = await response.json();
        const adressData = data.addressDetailList["$values"].map(address => ({
          label: address.addressTag,
          value: address.addressId,
        }));
        setAddressList(adressData);
        setShoppingList(data.shoppingDetailList["$values"]);
      } catch (error) {
        console.error('Adresler alınırken hata oluştu:', error);
      }
    };
    fetchAddresses();
  }, []);

  useEffect(() => {
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

  const handleOrderUpdate = (newOrderItem, shoppingCartIdToRemove = null) => {
    if (newOrderItem) {
      setOrder((prev) => [...prev, newOrderItem]);
    } else if (shoppingCartIdToRemove !== null) {
      setOrder((prev) => prev.filter(order => order.ShoppingCartId !== shoppingCartIdToRemove));
    }
  };

  const handleOrderCreation = async () => {
    const UserId = Number(await getData("userID"));
    if (order.length !== 0) {
      const response = await fetch(`${ipConfig}Shopping/FinalizeOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: UserId,
          OrderItems: order,
        }),
      });
      console.log(response.status);
      if (response.ok) {
        setShoppingList((prevShoppingList) =>
          prevShoppingList.filter(
            (shoppingListItem) =>
              !order.find(
                (orderItem) => orderItem.ShoppingCartId === shoppingListItem.shoppingCartId
              )
          )
        );
        setOrder([]);
        alert("Siparişiniz başarılı bir şekilde oluşturuldu!");
        navigation.navigate("CargoTrackingScreen")
      }
    }
  };

  const addAddress = async () => {
    navigation.navigate("UserAddressInfoScreen")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{orderSummary}</Text>
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => (
            <ShoppingItem
              item={item}
              addressList={addressList}
              onOrderUpdate={handleOrderUpdate}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>Alışveriş listeniz boş</Text>
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.orderButton,
          order.length === 0 && styles.orderButtonDisabled, 
        ]}
        onPress={handleOrderCreation}
        disabled={order.length === 0} 
      >
  <Text style={styles.orderButtonText}>{createOrder}</Text>
</TouchableOpacity>

      <BottomBarNavigation
        selectedMenu={selectedMenu}
        navigation={navigation}
        onNavigate={setSelectedMenu}
      />
    </View>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: "#7B1FA2",
  },
  orderButtonDisabled: {
    backgroundColor: '#ccc', 
    borderColor: '#999',
  },
  
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  orderButton: {
    position: 'relative',
    marginBottom: 90,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#7B1FA2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
