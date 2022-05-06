/**
 * Sample React Native CardDrivers2
 * https://github.com/facebook/react-native
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
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const CardDrivers2: () => Node = props => {
  const isDarkMode = useColorScheme() === '#3DB24B';
  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };

  return (
    <SafeAreaView>
      <View
        style={[
          Colors.darkGreen_BG,
          {
            height: windowHeight / 6,
            margin: 10,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            backgroundColor: props?.item?.state == 'in progress' ? '#F4EDED' : 'rgba(112,112,112, 0.82)',
            elevation: 7,
            justifyContent: 'center',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={[
              {
                width: windowWidth / 1.6,
                flexDirection: 'row',
                padding: 5,
                alignItems: 'center',
              },
            ]}>
            <Image
              source={{uri: `data:image/jpeg;base64,${props.item?.DriverData?.photoProfil}`}}
              style={[
                {
                  width: 60,
                  height: 60,
                  resizeMode: 'cover',
                  marginRight: 5,
                  borderRadius:100
                },
                Generalstyle.alignSelf,
              ]}
            />
            <View>
              <Text style={[{fontWeight: 'bold', color: 'black'}]}>
                {props?.item?.DriverData?.fullName}
              </Text>
              <Text style={[{color: 'black'}]}>
                {props?.item?.DriverData?.carBrand}
              </Text>
              <Text style={[{color: 'black'}]}>
                (225) {props?.item?.DriverData?.number}
              </Text>
            </View>
          </View>
          <View style={[{justifyContent: 'space-around'}]}>
            {props?.item?.state == "in progress" || props?.item?.state == "start"  && (
              <TouchableOpacity
                
                style={[
                  {
                    height: windowHeight / 20,
                    width: windowHeight / 6.7,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text style={[{color: 'black'}]}>En cours</Text>
              </TouchableOpacity>
            ) }
            {
              props?.item?.state == 'end' && 
              <TouchableOpacity
                
                style={[
                  {
                    height: windowHeight / 20,
                    width: windowHeight / 6.7,
                    borderRadius: 10,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                  },
                ]}>
                <Icons
                  name="checkcircle"
                  size={20}
                  style={[Colors.GreenLignt]}
                />
              </TouchableOpacity> 
            }
            {
              props?.item?.state == "cancel" && 
              <TouchableOpacity
                
                style={[
                  {
                    height: windowHeight / 20,
                    width: windowHeight / 6.7,
                    borderRadius: 10,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                  },
                ]}>
                <Icons
                  name="close"
                  size={20}
                  style={[{color:'red'}]}
                />
              </TouchableOpacity>
            }
            <Text style={[Colors.GreenLignt]}>{props?.item?.price} XOF </Text>
          </View>
        </View>
        <View style={[{flexDirection: 'row', justifyContent: 'space-around'}]}>
          <Text style={[{color: 'black'}, Generalstyle.bold]}>
            Place :{' '}
            {props?.item?.DriverData?.reservations } 
            / {props?.item?.seats}
          </Text>
          <Text style={[{color: 'black'}]}>
            {Fr.Depart}/Destination : {props?.item?.whereAreYou}/{props?.item?.whereAreYouGoing} 
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CardDrivers2;
