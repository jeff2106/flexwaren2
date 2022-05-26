/**
 * Sample React Native RaceStartFindCustomers
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
  ActivityIndicator,
  Linking,
  Alert
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
import Pusher from 'pusher-js/react-native';
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




const RaceStartFindCustomers: () => Node = ({navigation,route}) => {

  const { CustomersAvailableData,u_data,timestamp,Amount,curentPositionNext} = route.params;
  


  const [modalVisible, setModalVisible] = React.useState(false);
  const [alwaysAvailable, setAlwaysAvailable] = React.useState(1);
  const [isCommand, setIsCommand] = React.useState(true);
  const [displayD3, setdisplayD3] = React.useState(false);
  const [detailsCurrentOrders, setdetailsCurrentOrders] = React.useState("");
  const [Kilometers, setKilometers] = React.useState();
  const [Hourse, setHourse] = React.useState();
  const [widthLoad, setwidthLoad] = React.useState(100);
  const origin = {latitude: 37.78825, longitude: -122.4324};
  const destination = {latitude: 37.771707, longitude: -122.4053769};
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
        console.log('=====> First',info)
          if(curentPosition?.latitude != info.coords.latitude){
            console.log('=====> First',info)
  
            const { longitude, latitude } = info.coords;
            setCurentPosition({
              ...curentPosition,
              latitude,
              longitude,
            });
          }
          
         })
  });

  React.useEffect(() => {

    var formdata = new FormData();
    formdata.append("available", "Non");
    formdata.append("uidDrivers",  u_data?.id);
    formdata.append("uidLat", curentPosition.latitude);
    formdata.append("numberDrivers", u_data?.number);
    formdata.append("uidLng", curentPosition?.longitude);
    formdata.append("id", CustomersAvailableData?.id);
    formdata.append("state", "in progress");

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://prumad.com/API/index2.php?OrdersAccepte", requestOptions)
      .then(response => response.json())
      .then(result => {setdetailsCurrentOrders(result)})
      .catch(error => console.log('error', error));

  },[CustomersAvailableData]);

React.useEffect(() => {
      const interval = setInterval(() => {
        var formdata = new FormData();
        formdata.append("uidLat",curentPosition?.latitude);
        formdata.append("uidLng",curentPosition?.longitude);
        formdata.append("id",CustomersAvailableData?.id);

        var requestOptions = {
          method:'POST',
          body: formdata,
          redirect:'follow'
        };

        fetch('https://prumad.com/API/index2.php?OrdersUpdateDriversLocations',requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log("===> refresh Drivers Long Lat",response);
        })
        .catch(error =>  console.log(error))
      
      }, 10000);
      return () => clearInterval(interval);
     

  },[curentPosition?.latitude]);

    Pusher.logToConsole = false;

  var pusher = new Pusher('e4ad133537d71dc9e689', {
    cluster: 'mt1'
  });

  var channel = pusher.subscribe('Covoiturage');
  channel.bind('raceCancel', function(data) {
    console.log(data);
    if(data?.ConducteurID == u_data?.id){
      
      console.log(data);
     
     navigation.navigate("AccueilCovoiturageP",{u_data:u_data,timestamp:timestamp,Amount:Amount});
      }
    
  });   



if(detailsCurrentOrders == ""){
 return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
        <ActivityIndicator size="large"/>
      </View>
      )
}else{

/* === Notifications ====*/
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[{position:'absolute',top:10,zIndex:4}]} onPress={() => navigation.openDrawer()}> 
        <Icon name="menu" size={30} style={[Colors.Dark]} />
        </TouchableOpacity>
         <MapView
             showsUserLocation={true}
             showsMyLocationButton={true}
             mapType="standard"
             followsUserLocation={true}
             initialRegion={{
                 latitude: curentPosition?.latitude,
                 longitude: curentPosition?.longitude,
                 latitudeDelta: 0.000864195044303443,
                 longitudeDelta: 0.0000142817690068,
               }}
           style={styles.map}
           
         >
         
         <MapViewDirections
          strokeWidth={3}
          strokeColor={Colors.GreenLignt.color}
          origin={{ latitude: 37.785834 , longitude: -122.406417 }}
          destination={{latitude: detailsCurrentOrders?.whereYouAreLat,longitude: detailsCurrentOrders?.whereYouAreLng }}
          apikey={"AIzaSyDSbg654fWaJihkk3FIk52Je8viclmsYCU"}
          onReady={result => {
            const number = result.duration.toString();
            const distance = result.distance.toString();
            setHourse(number.split('.')[0]);
            console.log(number)
            setKilometers(distance);
          }}
        />
        <MapView.Marker
          coordinate={{latitude: parseFloat(detailsCurrentOrders?.whereYouAreLat),longitude:parseFloat(detailsCurrentOrders?.whereYouAreLng)}}
        >
          <Image
            style={{
              height:50,
              width:50,
              resizeMode: "contain",
              transform: [{ rotate:"120deg"}],
            }}
            source={Iconsimg.icon_customs}

          />
        </MapView.Marker>
         </MapView>
        
         <View style={{flexDirection:'row',position:'absolute',top:20,alignSelf:'center',backgroundColor:'white',width:'40%',padding:20,alignItems:'center',height:'auto',justifyContent:'space-evenly',borderRadius:30}}>
            <Image source={Iconsimg.icon_customs} />
            <View>
                  <Text style={{fontSize:15,marginLeft:10,color:'black',width:'auto',overflow:'hidden'}}>{detailsCurrentOrders?.whereYouAre.split(' ')[0]}</Text>
                  <Text style={{fontSize:15,marginLeft:10,textAlign:'center',color:'black'}}>...</Text>
            </View>
            
         </View>
        
        {
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
                  <Text style={{fontSize:20,color: "black",textAlign:'center'}}>Arrive dans ~ {Hourse} min</Text>
                  <Text style={{fontSize:12,textAlign:'center',fontWeight:'bold',color:'gray'}}>Prendre {detailsCurrentOrders?.userData?.fullName.split(' ')[0]}</Text>
              </View>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${detailsCurrentOrders?.numberCustomers}`)} style={[Generalstyle.shadow,Colors.White_BG,{height:50,width:50,justifyContent:'center',alignItems:'center',borderRadius:100}]} > 
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

              fetch(`https://prumad.com/API/index2.php?CancelRide=${detailsCurrentOrders?.uidCustomers}`, requestOptions)
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
        <TouchableOpacity onPress={() => 
          {
            var formdata = new FormData();
            formdata.append("id", CustomersAvailableData?.id);
            formdata.append("channel", CustomersAvailableData?.channel);

            
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow'
            };

            fetch("https://prumad.com/API/index2.php?UpdateCourseStart", requestOptions)
              .then(response => response.json())
              .then(result => {
               console.log(result);

                navigation.navigate('RaceInPending',{
                  CustomersAvailableData: detailsCurrentOrders,
                  u_data: u_data,
                  timestamp: timestamp,
                  Amount: Amount,
                  curentPositionNext: curentPositionNext
                })

              })
              .catch(error => console.log('error', error));

          }
        } style={[Generalstyle.shadow,Colors.White_BG,{height:40,width:'80%',justifyContent:'center',alignItems:'center',borderRadius:100},Colors.GreenLignt_BG]}> 
              <Text style={{fontSize:15,color: "white"}}>Je suis là</Text>
        </TouchableOpacity>

         </View>
        }
    </View>
  );
}

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
export default RaceStartFindCustomers;
