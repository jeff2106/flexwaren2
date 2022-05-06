import React from 'react';
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
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ImageBackground,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';

//Get Reel Dimension of Screen[]
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export default function PackPriceCov({navigation,route}) {
  const {u_data , timestamp, PackagePrice}=route.params;
  
  return (
    <View style={styles.container}>
      <View
        style={[
          Colors.Green_BG,
          {
            height: Height / 8,
            alignItems: 'center',
            justifyContent:'center'
          },
        ]}>
        <Text
          style={[
            {
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
            },
          ]}>
          {Fr.Cov}
        </Text>
        <Image source={Iconsimg.icon_covoiturage} style={[Generalstyle.DefaultImg,{
            width:40,height:40
        }]} />
      </View>
      <Text
        style={{
          color: '#1E8723',
          marginTop: 10,
          fontSize: 35,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Votre Pack
      </Text>

        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: PackagePrice?.color,
            height: Height / 3,
            borderRadius: 10,
            width: Width / 1.05,
            alignSelf: 'center',
            overflow: 'hidden',
          }}>
          <View>
            <View
              style={{
                backgroundColor: 'white',
                width: Width / 3,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontWeight: 'bold', color: '#1E8723' }}>
                {' '}
                {PackagePrice?.name}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                width: Width / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{ textAlign: 'left', color: 'white', fontSize: 200 }}>
                1
              </Text>
              <View>
                <Text
                  style={{ textAlign: 'left', color: 'white', fontSize: 30 }}>
                  {' '}
                  Mois
                </Text>
                <Text
                  style={{ textAlign: 'left', color: 'white', fontSize: 15 }}>
                  {' '}
                  Abonnement
                </Text>
                <Text
                  style={{ textAlign: 'left', color: 'white', fontSize: 15 }}>
                  {' '}
                  {PackagePrice?.name}
                </Text>
                </View>
            </View>
            <View style={{ width: Width / 2.3 }}>
              <Text
                style={{
                  textAlign: 'right',
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                {PackagePrice?.price}
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 30,
                }}>
                FCFA
              </Text>
            </View>
          </View>
        </TouchableOpacity>

     
      <View
        style={{
          marginRight: 10,
          position: 'absolute',
          bottom: 0,
          width: Width,
          height:80,
          alignSelf: 'center',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'white',
          borderTopLeftRadius:20,
          borderTopRightRadius:20
        }}>
        <TouchableOpacity  
        style={{height:40,borderRadius:20,alignSelf:'center',width:'80%',backgroundColor:'#3DB24B',justifyContent:'center',alignItems:'center'}}
        onPress={() => { navigation.navigate('PaimentPICov',{methodName: 'Mobile Money',title: '',u_data:u_data , timestamp: new Date().getTime(), PackagePrice: PackagePrice})}}>
          <Text style={{color:'white',fontWeight:'bold'}}>PASSEZ AU PAYEMENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    height: Height,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
