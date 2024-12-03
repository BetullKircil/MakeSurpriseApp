import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style = {styles.container}>
      <ActivityIndicator size={'large'} color={'gray'} style = {styles.activityIndicator}></ActivityIndicator>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    loadingText: {
        fontWeight: 'bold',
        fontSize: 16,
        
    },
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent:'center',
        alignItems: 'center',
    },
    activityIndicator: {
        zIndex: 1000
    }
})