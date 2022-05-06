/**
 * Sample React Native RaceInPending
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
  ImageBackground,
  TextInput,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import Geolocation from '@react-native-community/geolocation';
//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';
import HeaderCov from '../../../Components/headerCov';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//End




const RaceInPending: () => Node = ({navigation,route}) => {

  const { CustomersAvailableData,u_data,timestamp,Amount,curentPositionNext} = route.params;


  const [modalVisible, setModalVisible] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [isCommand, setIsCommand] = React.useState(true);
  const [displayD3, setdisplayD3] = React.useState(false);
  const [widthLoad, setwidthLoad] = React.useState(100);
  const origin = {latitude: 37.78825, longitude: -122.4324};
  const destination = {latitude: 37.771707, longitude: -122.4053769};
  const [Kilometers, setKilometers] = React.useState();
  const [Hourse, setHourse] = React.useState();
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDSbg654fWaJihkk3FIk52Je8viclmsYCU';
  const initialState = {
     latitude: 0,
     longitude: 0,
     latitudeDelta: 0.120864195044303443,
     longitudeDelta: 0.1220142817690068,
   };
   const [curentPosition, setCurentPosition] = React.useState(initialState);
  
  

  React.useEffect(() => {
    
    Geolocation.getCurrentPosition((info) => {
          const { longitude, latitude } = info.coords;
          setCurentPosition({
            ...curentPosition,
            latitude,
            longitude,
          });
          //console.log(info?.coords?.latitude);
          //console.log("======> reload position of Drivers");


        });

    
  }, [curentPosition?.latitude]);

  function CourseEnd(){

    var formdata = new FormData();
        formdata.append("id",CustomersAvailableData?.id);

     var requestOptions = {
                method: 'POST',
                redirect: 'follow',
                body:formdata 
              };

      fetch(`https://prumad.com/API/index2.php?UpdateCourseEnd`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        alert("Votre course viens de s'achever !!!");
        navigation.navigate("AccueilCovoiturageP",{
          u_data:u_data,
          timestamp:timestamp,
          Amount:Amount});
        })
      .catch(error => console.log('error', error));
  }

/* === Notifications ====*/
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[{position:'absolute',top:10,zIndex:4}]} onPress={() => navigation.openDrawer()}> 
        <Icon name="menu" size={30} style={[Colors.Dark]} />
        </TouchableOpacity>
         <MapView
             showsUserLocation={true}
             provider={PROVIDER_GOOGLE}
             showsMyLocationButton={true}
             mapType="standard"
             followsUserLocation={true}
             initialRegion={curentPosition}
           style={styles.map}
           
         >
         <MapView.Marker
          coordinate={{longitude: parseFloat(CustomersAvailableData?.whereYouGoingLng) , latitude: parseFloat(CustomersAvailableData?.whereYouGoingLat) }}
        >
          <Image
            style={{
              height:50,
              width:50,
              resizeMode: "contain",
            }}
            source={Iconsimg.sys_Localisation}

          />
        </MapView.Marker>
         <MapViewDirections
          strokeWidth={3}
          strokeColor={Colors.GreenLignt.color}
          origin={{latitude: curentPosition?.latitude,longitude: curentPosition?.longitude}}
          destination={{longitude: parseFloat(CustomersAvailableData?.whereYouGoingLng) , latitude: parseFloat(CustomersAvailableData?.whereYouGoingLat) }}
          apikey={GOOGLE_MAPS_APIKEY}
          onReady={result => {
            const number = result.duration.toString();
            const distance = result.distance.toString();
            setHourse(number.split('.')[0]);
            setKilometers(distance);
          }}
        />
         </MapView>
         <View style={{flexDirection:'row',position:'absolute',top:20,alignSelf:'center',backgroundColor:'white',width:'40%',padding:20,alignItems:'center',height:'auto',justifyContent:'space-evenly',borderRadius:30}}>
            <Image source={Iconsimg.sys_Localisation} style={{width:30,resizeMode:'contain',height:30}}/>
            <View>
                  <Text style={{fontSize:15,color:"black",width:40,overflow:'hidden'}}>{CustomersAvailableData?.whereYouGoing}</Text>
                  <Text style={{fontSize:15,color:"black",textAlign:'center'}}>....</Text>
            </View>
         </View>
        
         
         
        
          <View style={{
          position:'absolute',
          bottom:0,
          alignSelf:'center',
          backgroundColor:'white',
          width:'100%',
          alignItems:'center',
          height:'auto',
          justifyContent:'center',
          borderTopRightRadius:30,
          borderTopLeftRadius:30,
          padding:20}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,width:'100%'}}>
              <TouchableOpacity style={[]} onPress={() => setdisplayD3(!displayD3)}> 
                  {
                    displayD3 ? <Icons name="up" size={30} style={[Colors.Dark]} /> : <Icons name="down" size={30} style={[Colors.Dark]} />
                  }
              </TouchableOpacity>
              <View>
                  <Text style={{fontSize:20,color: "black",textAlign:'center'}}>{Hourse} min & {Kilometers} m</Text>
              </View>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${CustomersAvailableData?.numberCustomers}`)} style={[Generalstyle.shadow,Colors.White_BG,{height:50,width:50,justifyContent:'center',alignItems:'center',borderRadius:100}]} > 
                        <Icons name="phone" size={30} style={[Colors.Dark]} />
              </TouchableOpacity>

          </View>
          <Text/>
          {
            displayD3 &&
            <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={[Generalstyle.shadow,Colors.White_BG,{height:50,width:50,justifyContent:'center',alignItems:'center',borderRadius:100}]} onPress={() => {

              var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
              };

              fetch(`https://prumad.com/API/index2.php?CancelRide=${CustomersAvailableData?.uidCustomers}`, requestOptions)
                .then(response => response.json())
                .then(result => {console.log(result);navigation.navigate("AccueilCovoiturageP",{u_data:u_data,timestamp:timestamp,Amount:Amount});})
                .catch(error => console.log('error', error));
            
              
            }}> 
                  <Icons name="close" size={30} style={[{color:'red'}]} />
                </TouchableOpacity>
                <Text/>
                <Text style={{fontSize:15,color: "black"}}>Annuler le voyage</Text>
                <Text/>

            </View>
          }
        <TouchableOpacity onPress={() => CourseEnd()} style={[Generalstyle.shadow,Colors.White_BG,{height:40,width:'80%',justifyContent:'center',alignItems:'center',borderRadius:100},Colors.GreenLignt_BG]}> 
              <Text style={{fontSize:15,color: "white"}}>TERMINER</Text>
        </TouchableOpacity>

         </View>
        
    </View>
  );
};
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end'
 },
 map: {
   ...StyleSheet.absoluteFillObject
 },
});
export default RaceInPending;
