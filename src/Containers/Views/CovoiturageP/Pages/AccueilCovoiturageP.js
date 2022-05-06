/**
 * Sample React Native AccueilCovoiturageP
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
  TextInput
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
import AsyncStorage from '@react-native-async-storage/async-storage'


//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';
import HeaderCov from '../../../Components/headerCov';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Pusher from 'pusher-js/react-native';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//End




const AccueilCovoiturageP: () => Node = ({navigation,route}) => {

  const {u_data,timestamp,Amount } = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [CustomersAvailable, setCustomersAvailable] = React.useState(false);
  const [CustomersAvailableData, setCustomersAvailableData] = React.useState([]);
  const [widthLoad, setwidthLoad] = React.useState(100);
  const [Online, setOnline] = React.useState(false);
  const [CourseEmie, setCourseEmie] = React.useState(true);
  const [TimeOutOrders,setTimeOutOrders] = React.useState(20);


  const [CountCustomers, setCountCustomers] = React.useState(0);



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
  const [MyAbonnment, setMyAbonnment] = React.useState();


  if(Amount?.solde < 200){
    navigation.navigate('PackChooseCov',{u_data:u_data,timestamp : new Date().getTime()
    })
  }


  React.useEffect(() => {
    
    Geolocation.getCurrentPosition((info) => {
          const { longitude, latitude } = info.coords;
          setCurentPosition({
            ...curentPosition,
            latitude,
            longitude,
          });
        });
    
    
  }, [curentPosition?.latitude]);



 

Geolocation.watchPosition((position) => {
    var lastPosition = JSON.stringify(position);
  });
  
  React.useEffect(() => {

    if(Online){
      console.log(curentPosition?.latitude);
      var formdata = new FormData();
      formdata.append("DriversLat", curentPosition?.latitude);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://prumad.com/API/index2.php?FindCustomersMaps", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result?.length);
          if(result?.length > 0){
            setCustomersAvailableData(result);
            setCustomersAvailable(!CustomersAvailable);
            setwidthLoad(100);

          }else{
            setCustomersAvailable(!CustomersAvailable);
          }
        })
        .catch(error => console.log('error', error));
    }
   },[Online,CourseEmie,])
      
      

  React.useEffect(() => {
    
    if(CustomersAvailableData?.length > 0){

      if(CustomersAvailableData?.length > CountCustomers){
        if(widthLoad >= 15 ){
          const interval = setInterval(() => {
            setwidthLoad(widthLoad-10);
          }, 2000);
          return () => clearInterval(interval);
        }else{
          setCountCustomers(CountCustomers + 1);
          setwidthLoad(100);
        }
      }else{
        setCustomersAvailableData();
        setCustomersAvailable(!CustomersAvailable);
        setCountCustomers(0);


      }
    }
   
  },[CustomersAvailableData,widthLoad]);

  React.useEffect(() => {
  if(CustomersAvailable == true){
    if(TimeOutOrders > 0){
      const interval = setInterval(() => {
        setTimeOutOrders(TimeOutOrders-1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }
},[TimeOutOrders]);

Pusher.logToConsole = false;

var pusher = new Pusher('e4ad133537d71dc9e689', {
  cluster: 'mt1'
});

var channel = pusher.subscribe('ordersAdd');
channel.bind('ordersAdd', function(data) {
  setCourseEmie(!CourseEmie);
});

//Voir si l'utilisateur viens de s'inscrire//
   

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
         followsUserLocation={true}
         initialRegion={curentPosition}
       
     >
     <MapViewDirections
      strokeWidth={3}
      strokeColor={Colors.GreenLignt.color}
      origin={origin}
      destination={destination}
      apikey={GOOGLE_MAPS_APIKEY}
    />
     </MapView>
    
     <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{flexDirection:'row',position:'absolute',top:20,alignSelf:'center',backgroundColor:'white',width:'40%',alignItems:'center',height:50,justifyContent:'center',borderRadius:30}}>
        <Image source={Iconsimg.sys_moneyPiece} />
        <Text style={{fontWeight:'bold',fontSize:20,marginLeft:10,color:'black'}}>{Amount?.solde} XOF</Text>
     </TouchableOpacity>


    {
      Online &&
      <TouchableOpacity onPress={() => setOnline(!Online)} style={{flexDirection:'row',position:'absolute',bottom:80,alignSelf:'center',backgroundColor:'white',width:'22%',alignItems:'center',height:80,justifyContent:'center',borderRadius:100}}>
        <Text style={{fontWeight:'bold',fontSize:20,color:'red'}}>STOP</Text>
      </TouchableOpacity>
    } 
    {
      !Online && 
      <TouchableOpacity onPress={() => setOnline(!Online)} style={{position:'absolute',bottom:80,alignSelf:'center',backgroundColor:Colors.GreenLignt_BG.backgroundColor,width:'22%',alignItems:'center',height:80,justifyContent:'center',borderRadius:100}}>
        <Text style={{fontWeight:'bold',fontSize:20,color:'white'}}>C'EST</Text>
        <Text style={{fontWeight:'bold',fontSize:20,color:'white'}}>PARTI</Text>

      </TouchableOpacity>
    } 
    {
      //Bottom default
      !CustomersAvailable && 
      <View style={{position:'absolute',
      bottom:0,
      alignSelf:'center',
      backgroundColor:'white',
      width:'100%',
      alignItems:'center',
      height:70,
      justifyContent:'center',
      borderTopRightRadius:30,
      borderTopLeftRadius:30}}>
        { Online ? 
        <View>
        <Text onPress={() => setCustomersAvailable(!CustomersAvailable)} style={{fontWeight:'bold',fontSize:20,marginLeft:10,color: Colors.GreenLignt.color}}>Vous êtes en ligne</Text>
        <Text style={{fontSize:10,textAlign:'center',color:'gray'}}>Recherche de client ...</Text>
        </View> :
        <View>
        <Text  style={{fontWeight:'bold',fontSize:20,marginLeft:10,color: 'red'}}>Vous êtes  hors ligne</Text>
        
        </View>
        }
        
     </View>
    }
    {
      //Les requete sont diplay
      CustomersAvailable && 
      <View style={{position:'absolute',
      bottom:0,
      alignSelf:'center',
      backgroundColor:'white',
      width:'100%',
      height:"auto",
      borderTopRightRadius:30,
      borderTopLeftRadius:30}}>
      <Text/>
        <Text style={{fontSize:15,marginLeft:10,color: "black",alignSelf:'center',fontWeight:'bold'}}>{CustomersAvailableData[CountCustomers]?.price ?? 0} XOF - {CustomersAvailableData[CountCustomers]?.Km} KM</Text>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
        <Image source={Iconsimg.sys_AcceptCustomers} />
        <Text style={{color:'black'}}> + {CustomersAvailableData?.length}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <View style={{ borderTopWidth: 1,opacity:0.2,width:'100%',color:'black' ,marginTop:10,marginRight:10,marginLeft:10}} />
        </View>
        <Text/>
        <Text style={{fontWeight:'bold',fontSize:14,marginLeft:30,color:'black'}}>Point de départ</Text>
        <Text style={{fontWeight:'bold',fontSize:20,marginLeft:30,color: 'black'}}>{CustomersAvailableData?.length > 0 ? CustomersAvailableData[CountCustomers]?.whereYouAre : "Vous n'avez pas d'alerte disponible"}</Text>
        <Text/>
        {CustomersAvailableData?.length > 0 ? 
        <TouchableOpacity onPress={() => {
            navigation.navigate('RaceStartFindCustomers',{
                    CustomersAvailableData:CustomersAvailableData[CountCustomers],
                    u_data:u_data,
                    timestamp:timestamp,
                    Amount:Amount,
                    curentPositionNext:curentPosition,
                    Amount:Amount
                  });
          setCustomersAvailableData();
          setCustomersAvailable(!CustomersAvailable);
          setCountCustomers(0);
          }} style={{alignSelf:'center',margin:20}}>
              <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:widthLoad > 10 ? Colors.GreenLignt_BG.backgroundColor : 'white',borderRadius:100,width:`${widthLoad}%`,height:40,overflow:'hidden'}}>
                  <Text style={{marginRight:10,color:'white'}}>APPUYEZ POUR ACCEPTER</Text>
                  <View style={{backgroundColor: "#053706",width:40,height:40,borderRadius:100,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white'}}>{widthLoad}</Text></View>
              </View>
        </TouchableOpacity> : 
        <TouchableOpacity onPress={() => {
          setCustomersAvailable(!CustomersAvailable);
          }} style={{alignSelf:'center',margin:20}}>
              <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'red',borderRadius:100,width:`${widthLoad}%`,height:40,overflow:'hidden'}}>
                  <Text style={{marginRight:10,color:'white'}}>APPUYEZ POUR FERMER</Text>
                  <View style={{backgroundColor: "#053706",width:40,height:40,borderRadius:100,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white'}}>0</Text></View>
              </View>
        </TouchableOpacity>
      }
        
      </View>
    }
    
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
export default AccueilCovoiturageP;
