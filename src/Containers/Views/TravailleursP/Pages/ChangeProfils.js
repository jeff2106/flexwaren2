import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
const Width = Dimensions.get('window').width;

const Height = Dimensions.get('window').height;

export default function ChangeProfils() {
  const dataPrice = [
    {
      id: 1,
      name: 'Court trajet',
      price: '20.000',
      color: '#053706',
    },
  ];
  return (
    <View style={styles.container}>
         <Image
          style={{ width: 70, resizeMode: 'contain' }}
          source={require('./assets/snack-icon.png')}
        />
        <Text style={{color:'red',fontWeight:'bold'}}>Vous êtes sur le point de changer de profil</Text>
      <View
        style={{
          marginRight: 10,
          position: 'absolute',
          bottom: 30,
          width: Width,
          alignSelf: 'center',
          height: 80,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#1E8723',
            height: 50,
            justifyContent: 'center',
            width: '45%',
            borderRadius:13
          }}>
          <Text
            style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' ,color:'white'}}>
            Confirmer
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'red',
            height: 50,
            width: '45%',
            justifyContent: 'center',
            borderRadius:13
          }}>
          <Text
            style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold',color:'white' }}>
            Annuler
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    height: Height,
    justifyContent: 'center',
    alignItems:'center'
  },
});
