import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import {ipConfig} from "../../../scripts/enums"
import useAsyncStorage from '../../helper/useAsyncStorage';

const AnnouncementPreferencesScreen = ({navigation}) => {
    const [specialDayAnnounceData, setSpecialDayAnnounceData] = useState([]);
  
  const { getData } = useAsyncStorage();
  useEffect(()=>{
    async function getSpecialDaysAnnounce() {
      const UserId = Number(await getData("userID"));
      const response = await fetch(`${ipConfig}SpecialDayCalendar/GetAllSpecialDays?userId=${UserId}`)
      if(response.ok){
        const data = await response.json();
        console.log("special day data: ", data)
        const sortedSpecialDayAnnounceData = data["$values"].sort((dateFirst, dateLast) => 
          {
            return new Date(dateFirst.specialDayDate) - new Date(dateLast.specialDayDate);
          })
          console.log("sortedSpecialDayAnnounceData:", sortedSpecialDayAnnounceData )
        setSpecialDayAnnounceData(sortedSpecialDayAnnounceData)
      }
    }
    getSpecialDaysAnnounce()
  }, [])

  return (
    <View>
      <Text>AnnouncementPreferencesScreen</Text>
    </View>
  )
}

export default AnnouncementPreferencesScreen

const styles = StyleSheet.create({})