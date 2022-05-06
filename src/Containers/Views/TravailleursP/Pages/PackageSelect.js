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

export default function PackSelectT() {
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
      <View style={{ backgroundColor: '#1E8723', height: 80 }}>
        <Text></Text>
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

      {dataPrice.map((item, index) => (
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: item.color,
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
                {item.name}
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
                style={{ textAlign: 'right', color: 'white', fontSize: 200 }}>
                1
              </Text>
              <Text
                style={{ textAlign: 'right', color: 'white', fontSize: 30 }}>
                {' '}
                Mois
              </Text>
            </View>
            <View style={{ width: Width / 2.3 }}>
              <Text
                style={{
                  textAlign: 'right',
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                {item.price}
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
      ))}

     
      <View
        style={{
          marginRight: 10,
          position: 'absolute',
          bottom: -Height / 10,
          width: Width / 1.2,
          alignSelf: 'center',
        }}>
         <Text style={{fontSize:30,textAlign:'center',fontWeight:'bold'}}>Mobile Money</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 10,
          marginRight: 10
        }}>
        <Image
          style={{ width: 70, resizeMode: 'contain' }}
          source={require('./assets/snack-icon.png')}
        />
        <Image
          style={{ width: 70, resizeMode: 'contain' }}
          source={require('./assets/snack-icon.png')}
        />
        <Image
          style={{ width: 70, resizeMode: 'contain' }}
          source={require('./assets/snack-icon.png')}
        />
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
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
