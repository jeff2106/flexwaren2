/**
 * Sample React Native CardDrivers
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
  ActivityIndicator
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

const CardDrivers: () => Node = props => {
  const isDarkMode = useColorScheme() === '#3DB24B';
  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };
  const [isValid, setIsValid] = React.useState();
  const [isLoading, setisLoading] = React.useState(true);

  function LoadValidReservation (){
    if(props?.title == Fr.IntV){
      var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://prumad.com/API/?validUser=${props.item?.item?.id}&validCustom=${props.UID?.id}`, requestOptions)
      .then(response => response.json())
      .then(result => { setIsValid(result);console.log(result);setisLoading(false)})
      .catch(error => console.log('error', error));
    }
    if(props?.title == Fr.Tav){
      var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://prumad.com/API/?validUser=${props.item?.item?.id}&validCustom=${props.UID?.id}`, requestOptions)
      .then(response => response.json())
      .then(result => { setIsValid(result);console.log(result);setisLoading(false)})
      .catch(error => console.log('error', error));
    }
    
  }
  React.useEffect(() => {

         LoadValidReservation ();
  },[props.r,])

  if(isLoading){

    return <ActivityIndicator size="large"/>

  }
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
            backgroundColor: '#F4EDED',
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
              source={{uri: `data:image/jpeg;base64,${props.item?.item?.DriverData?.photoProfil}`}}
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
              <Text style={[{fontWeight: 'bold', color: 'black',width:150}]}>
                {props?.item?.item?.DriverData?.fullName}
              </Text>
              <Text style={[{color: 'black',fontWeight:'bold'}]}>
                {props?.item?.item?.DriverData?.carBrand}
              </Text>
              <Text style={[{color: 'black'}]}>
              
                {props?.item?.item?.DriverData?.numberMatricles.toUpperCase()}
              
              </Text>
            </View>
          </View>
          <View style={[{justifyContent: 'space-around'}]}>
            {isValid?.messages == 'Non' ? (
              <TouchableOpacity
                onPress={() => {props.Func(props?.item?.item); props.showReservation(isValid?.messages);}}
                style={[
                  Colors.darkGreen_BG,
                  {
                    height: windowHeight / 20,
                    width: windowHeight / 6.7,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    backgroundColor: '#F4EDED',
                    elevation: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text style={[{color: 'black'}]}>{Fr.Reserver}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {props.Func(props?.item?.item); props.showReservation(isValid?.messages);}}
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
                <Icon name="notifications" size={25} style={[Colors.Dark]} />
              </TouchableOpacity>
            )}

            <Text style={[Colors.GreenLignt]}>{props?.item?.item?.price} XOF </Text>
          </View>
        </View>
        <View style={[{flexDirection: 'row', justifyContent: 'space-around'}]}>
          <Text style={[{color: 'black'}, Generalstyle.bold]}>
            {Fr.NbPlace} :{' '}
            {props?.item?.item?.totalSeats}
            /{props?.item?.item?.seats}
          </Text>
          <Text style={[{color: 'black'}]}>
            {Fr.Depart} : {props?.item?.item?.date}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CardDrivers;
