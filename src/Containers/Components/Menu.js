/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{ useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Switch,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Colors from '../Utils/Colors.js';
import Fr from '../Utils/Fr';
import Iconsimg from '../Utils/Img';
import Generalstyle from '../Utils/GeneralStyle';
import { AuthContext } from './context';
import {navigateAndReset , navigateAndSimpleReset} from '../../Navigators/utils'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Menu: () => Node = (props) => {
	const navigation = useNavigation();
  const { signOut } = React.useContext(AuthContext);
  const [u_data, setdata] = React.useState(props.data);


  return (

        <View style={styles.Container}>
          <Text/>
            <Image
              source={{uri: `data:image/jpeg;base64,${u_data?.u_data?.photoProfil}`}}
              style={[
                {
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                  marginRight: 5,
                  borderRadius:100
                },
                Generalstyle.alignSelf,
              ]}
            />
          <Text/>
          <Text style={[styles.bold,styles.alignSelf,styles.MenuProfilStyle,styles.fontSizeTitle,styles.marginBottom]}>{u_data?.u_data?.fullName}</Text>
          <Text style={[styles.bold,styles.alignSelf,styles.MenuProfilStyle,styles.marginBottom]}>(+225) {u_data?.u_data?.number}</Text>
          <TouchableOpacity onPress={() => navigateAndSimpleReset('Index',{u_dataV: JSON.stringify(u_data),timestamp:new Date().getTime()})} style={styles.containItemNavigation}>
              <Icon size={30} color="black" name="home" /><Text style={[styles.MenuProfilStyle,styles.textEquilibryMargin]}>Accueil</Text>
          </TouchableOpacity>
          {
           u_data?.u_data?.accountType == Fr.C &&
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard',{u_dataV: u_data,timestamp:new Date().getTime()})} style={styles.containItemNavigation}>
              <Icon size={30} color="black" name="view-dashboard-outline" /><Text style={[styles.MenuProfilStyle,styles.textEquilibryMargin]}>Tableau de bord</Text>
            </TouchableOpacity>
          }

          {
           u_data?.u_data?.accountType == 5  &&
            <TouchableOpacity onPress={() => navigateAndSimpleReset('PaymentMethode',{u_dataV: u_data,timestamp:new Date().getTime()})} style={styles.containItemNavigation}>
              <Icon size={30} color="black" name="cash" /><Text style={[styles.MenuProfilStyle,styles.textEquilibryMargin]}>Mode de paiement</Text>
            </TouchableOpacity>
          }
          {
           u_data?.u_data?.accountType == Fr.C &&
            <TouchableOpacity onPress={() => props.navigation.navigate('Securite',{u_dataV: u_data,timestamp:new Date().getTime()})} style={styles.containItemNavigation}>
              <Icon size={30} color="black" name="security" /><Text style={[styles.MenuProfilStyle,styles.textEquilibryMargin]}>Securité</Text>
            </TouchableOpacity>
          }
          {
           u_data?.u_data?.accountType != Fr.C &&
          <TouchableOpacity onPress={() => props.navigation.navigate('Historique',{u_dataV: u_data,timestamp:new Date().getTime()})} style={styles.containItemNavigation}>
              <Icon size={30} color="black" name="history" /><Text style={[styles.MenuProfilStyle,styles.textEquilibryMargin]}>Historique des commandes</Text>
          </TouchableOpacity>
        }
          <View style={{position:'absolute',bottom:10,width:windowWidth/1.5}}>
              <Text   onPress={() => {
                  Linking.openURL('tel:0757595959')
                }} style={{color:'black',fontWeight:'bold',textAlign:'left',fontSize:15,marginLeft:10}}>Service d'assistance</Text>
              <Text/>

              <Text onPress={() => {
                  Linking.openURL('https://prumad.com')
                }} style={{color:'black',fontWeight:'bold',textAlign:'left',fontSize:15,marginLeft:10}}>A propos de nous</Text>

              <Text/>
              <Text/>
              <Text onPress={() => signOut(u_data)} style={{color:'red',fontWeight:'bold',textAlign:'center',fontSize:20}}>Deconnexion</Text>

          </View>
        </View>
  );
};

const styles = StyleSheet.create({

  Container: {
    paddingTop: 10,
    flex:1
  },
  ContentTextStyle: {
  	color: 'black'
  },
  ProfilImgStyle:{
    resizeMode: 'contain',
    width: "50%",
    height: '40%',
    borderRadius: 500,
    overflow: "hidden",
    alignSelf: 'center'
  },
  containItemNavigation:{
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    margin:10

  },
  bold: {
    fontWeight: 'bold'
  },
  alignSelf: {
    alignSelf:'center'
  },
  MenuProfilStyle: {
    color: 'black'
  },
  textEquilibryMargin:{
    marginTop: 8,
    marginLeft: 20
  },
  fontSizeTitle: {
    fontSize: 20
  },
  marginBottom:{
    marginBottom:20
  }
});

export default Menu;
