import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserProfileItem = ({ item, onDelete, onPress }) => {
  const initials = `${item.firstName[0].toUpperCase()}${item.lastName[0].toUpperCase()}`;

  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item.userRelativeId)}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.itemStyle}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameText}>
            {`${item.firstName} ${item.lastName}`}
          </Text>
          <Text style={styles.nameText}>{`(${item.tag})`}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.userRelativeId)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileItem;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 10,
      },
      nameText: {
        fontSize: 16,
        color: '#333',
        width: 200,
        overflow: 'hidden',
        textAlign: 'left',
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
        width: 220
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4caf50',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
      },
      avatarText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      itemStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 50
      },
      deleteButton: {
        backgroundColor: "red",
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 20
      },
      emptyText: {
        fontSize: 20,
        color: '#555',
        marginBottom: 20,
      },
      deleteButtonText: {
        color: "white",
        fontWeight: "bold",
      },
});
