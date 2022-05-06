/**
 * Sample React Native CarRegister
 * https://github.com/facebo{Fr.VV}/react-native
 *
 * @format
 * @flow strict-local
 */

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

//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const CarRegister: () => Node = ({navigation, route}) => {

  const { data, typeC } = route.params;

  const [modalVisible, setModalVisible] = React.useState(false);

  const [brand, setbrand] = React.useState('');
  const [model, setmodel] = React.useState('');
  const [year, setyear] = React.useState('');
  const [matricul, setmatricul] = React.useState('');


  return (
    <View style={[{height: windowHeight, flex: 1}]}>
      <ScrollView style={[{height: windowHeight}]}>
        <View
          style={[
            Colors.GreenLignt_BG,
            {
              height: windowHeight / 10,
              alignItems: 'center',
              padding: 10,
              flexDirection: 'row',
            },
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={35} style={[{color: 'white'}]} />
          </TouchableOpacity>
          <Text
            style={[
              {
                color: 'white',
                fontSize: 20,
                marginLeft: 20,
                fontWeight: 'bold',
                paddingLeft: 10,
              },
            ]}>
            {Fr.TPV}
          </Text>
        </View>
        <Image
          source={Iconsimg.sys_img_carR}
          style={[
            {
              resizeMode: 'contain',
              width: windowWidth / 2,
              alignSelf: 'center',
            },
          ]}
        />
        <Text
          style={{
            alignSelf: 'center',
            color: '#3DB24B',
            marginTop: 20,
            marginBottom: 20,
            textAlign: 'center',
            width: 250,
          }}>
          {Fr.TPVT}
        </Text>
        <View style={{margin: 5}}>
          <Text style={{marginLeft: 10, color: '#3DB24B', marginBottom: 20}}>
            {Fr.MRQ}
          </Text>
          <TextInput
            onChangeText={(val) => setbrand(val) }
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                color:'black',
                fontSize: 15,
                width: windowWidth / 1.1,
                fontWeight: 'bold',
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{marginLeft: 10, color: '#3DB24B', marginBottom: 20}}>
            {Fr.MDRL}
          </Text>
          <TextInput
            onChangeText={(val) => setmodel(val) }
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                color:'black',
                fontSize: 15,
                width: windowWidth / 1.1,
                fontWeight: 'bold',
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{marginLeft: 10, color: '#3DB24B', marginBottom: 20}}>
            {Fr.DY}
          </Text>
          <TextInput
            keyboardType={"number-pad"}
            onChangeText={(val) => setyear(val) }
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                color:'black',
                fontSize: 15,
                width: windowWidth / 1.1,
                fontWeight: 'bold',
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{marginLeft: 10, color: '#3DB24B', marginBottom: 20}}>
            {Fr.MMTR}
          </Text>
          <TextInput

            onChangeText={(val) => setmatricul(val) }
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                color:'black',
                fontSize: 15,
                width: windowWidth / 1.1,
                fontWeight: 'bold',
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{height: 40}} />
        <View>
          <TouchableOpacity
            onPress={() =>
             {
              data.push(brand);
              data.push(model);
              data.push(year);
              data.push(matricul);
              console.log(data);
              navigation.navigate('BeforeLastInsertUser', {
                               data: data,
                               typeC: typeC,
                            })}
            }
            style={[
              {
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius: 40,
                width: '90%',
                alignSelf: 'center',
              },
              Colors.Gray_BG,
            ]}>
            <Text style={{color:'white',fontWeight:'bold'}}>{Fr.next}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CarRegister;
