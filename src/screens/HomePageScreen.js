import React , {useState}from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');


const HomePageScreen = ( {navigation}) => {
    const [selectedMenu, setSelectedMenu] = useState('home');

  const handleMenuPress = (menu) => {
    setSelectedMenu(menu); 
  };
    const comments = [
        {
          id: 1,
          comment: "Make Surprise ile sevdiklerime gerçekten anlamlı ve özel hediyeler seçmek artık çok kolay!",
          userName: "Ayşe K.",
          location: "İstanbul", 
        },
        {
          id: 2,
          comment: "Sürpriz elementini koruyarak sevdiklerimi mutlu ediyorum.",
          userName: "Mehmet L.",
          location: "Ankara",
        },
        {
          id: 3,
          comment: "Kişisel tercihlerime uygun öneriler alıyorum, harika!",
          userName: "Elif Y.",
          location: "İzmir",
        },
      ];
  return (
    <View style={styles.container}>
        
        <Text style={styles.appTitleStyle}>
            <Text style={styles.makeStyle}>Make</Text>
            <Text style={styles.surpriseStyle}>Surprise</Text>
        </Text>
        <View style={styles.scrollableContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandsContainer}>
            <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
                <Image
                source={require('@/assets/images/anonymous-person.png')} 
                style={styles.brandsLogo}
                />
            </ScrollView>
        </View>
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.carouselContainer}>
            {comments.map((item) => (
                <View key={item.id} style={[styles.userComments, { width}]}>
                <Text style={styles.userCommentsTitleText}>Öne Çıkan Kullanıcı Yorumları</Text>
                <View style={styles.userImageAndCommentContainer}>
                    <Image source={require('@/assets/images/anonymous-person.png')} style={styles.anonymousPersonLogo} />
                    <View style={styles.commentTextContainer}>
                    <Text style={styles.userCommentText}>"{item.comment}"</Text>
                    <Text style={styles.userNameText}> {item.userName} - {item.location}</Text>
                    </View>
                </View>
                </View>
            ))}
         </ScrollView>
        <View style={styles.optionsAndMenusContainer}>
            <View style={styles.giftToSomebodyContainer}>
                <TouchableOpacity style={styles.optionBox}>
                <Image
                source={require('@/assets/images/gift-to-sb.gif')} 
                style={styles.giftToSomebodyLogo}
                />
                <Text style={styles.optionText}>SEVDİKLERİNE SÜRPRİZ YAP</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.gifYourselfContainer}>
                <TouchableOpacity style={styles.optionBox}>
                <Image
                    source={require('@/assets/images/gift-yourself.gif')} 
                    style={styles.giftYourselfLogo}
                />
                <Text style={styles.optionText}>KENDİNE SÜRPRİZ YAP</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomNav}>
                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => navigation.navigate('HomePageScreen')}
                >
                    <Image
                    source={require('@/assets/images/home.png')}
                    style={styles.homeNavBarLogo}
                    />
                    {selectedMenu === 'home' && <View style={styles.redDot} />}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => navigation.navigate('CalendarScreen')}
                >
                    <Image
                    source={require('@/assets/images/calender.png')}
                    style={styles.homeNavBarLogo}
                    />
                    {selectedMenu === 'calendar' && <View style={styles.redDot} />}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => navigation.navigate('UserCustomizeSurpriseScreen')}
                >
                    <Image
                    source={require('@/assets/images/shopping-basket.png')}
                    style={styles.homeNavBarLogo}
                    />
                    {selectedMenu === 'shopping' && <View style={styles.redDot} />}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => navigation.navigate('UserProfileScreen')}>
                    <Image
                    source={require('@/assets/images/profile.png')}
                    style={styles.homeNavBarLogoForProfile}
                    />
                    {selectedMenu === 'profile' && <View style={styles.redDot} />}
                </TouchableOpacity>
        </View>
        </View>
        </View>
  );
};
export default HomePageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eedaf0',
  },
  scrollableContainer: {
    // backgroundColor: '#e0f7fa',
    marginTop: 100
  },
  redDot: {
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    marginTop: 4, // İkonun hemen altına kırmızı noktayı ekler
  },
  commentTextContainer: {
    flex: 1,
  },
  brandsContainer: {
    flexDirection: 'row',
  },
  brandLogo: {
    width: 60,
    height: 30,
    marginHorizontal: 10,
  },
  appTitleStyle:{
    fontStyle:'italic',
    fontSize:25,
    position: 'absolute', 
    top: 0,              
    alignSelf: 'center',
    marginTop: 45
  },
  giftYourselfLogo: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom: 15,
    marginLeft: -35,
  },
  userNameText: {
    marginLeft: 150
  },
  giftToSomebodyLogo: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom: 15,
  },
  anonymousPersonLogo: {
    width: 60,
    height: 60,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15
  },
  carouselContainer: {
    
  },
  brandsLogo: {
    width: 60,
    height: 60,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 5
  },
  homeNavBarLogo: {
    width: 30,
    height: 30,
    marginHorizontal: 5
  },
  homeNavBarLogoForProfile: {
    width: 35,
    height: 35,
    marginHorizontal: 5
  },
  makeStyle: {
    color: '#FFF', 
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  surpriseStyle: {
    color: '#8A2BE2', 
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  giftToSomebodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    height: 200,
    marginBottom: 100,
  },
  userComments: {
    backgroundColor: '#faf0b9',
    borderRadius: 23,
  },
  gifYourselfContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    height: 200,
    marginTop: -108,
  },
  optionsAndMenusContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 16,
  },
  optionBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  optionText: {
    color: '#8A2BE2',
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 10,
    textAlign: 'center',
  },
  userCommentText: {
    color: '#8A2BE2',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'start',
    paddingHorizontal: 20
  },
  userCommentsTitleText: {
    color: '#0d0c0d',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 10,
    paddingTop: 2,
    textAlign: 'start',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    // backgroundColor: '#bd88ae',
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: '#8A2BE2'
  },
  navItem: {
    alignItems: 'center',
  },
  userImageAndCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10
  },
});
