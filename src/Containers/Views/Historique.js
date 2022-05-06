import React, { useCallback, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View,Dimensions,Text,Image , ActivityIndicator} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Geolocation from "@react-native-community/geolocation";
import {navigateAndReset , navigateAndSimpleReset} from '../../Navigators/utils'

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';



//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';
import Header from '../Components/Header';
import BottomSheet2, { BottomSheetRefProps } from '../Components/BottomSheet2';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';



//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDSbg654fWaJihkk3FIk52Je8viclmsYCU';

//End

export default function App({navigation,route}) {
  const ref = useRef(null);
  const {u_dataV,timestamp} = route.params;


  const [historiqueSelected, sethistoriqueSelected] = React.useState();
  const [MyHistorique, setMyHistorique] = React.useState();
  const [defaultMaps, setDefaultMaps] = React.useState({latitude: 37.771707, longitude: -122.4053769});
  const origin = {latitude: 37.78825, longitude: -122.4324};
  const destination = {latitude: 37.771707, longitude: -122.4053769};
  const [error, setError] = React.useState("");
    const [position, setPosition] = React.useState({
        latitude: 0,
        longitude: 0
    });


  const onPress = useCallback(() => { 
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  React.useEffect(() => {
        const watchId = Geolocation.watchPosition(pos => {
          console.log("========> Log");
            setError("");
            setPosition({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            });
        }, e => setError(e.message));
        return () => Geolocation.clearWatch(watchId);
    }, []);

  function Historique(){
  var formdata = new FormData();

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(`http://prumad.com/API/index2.php?getHistoryCourse=${u_dataV?.u_data?.id}`, requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result);setMyHistorique(result)})
    .catch(error => console.log('error', error));
  }
  React.useEffect(() => {
    Historique()
  },[timestamp]);

  if(MyHistorique?.length < 1){
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
        <ActivityIndicator size="large"/>
      </View>
      )
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateAndSimpleReset('Index')} style={{margin:20}}>
              <Icon size={30} color={Colors.GreenLignt?.color} name="arrowleft" />
      </TouchableOpacity>
      <Text style={[Generalstyle.bold,{fontSize:20},Generalstyle.alignSelf,Colors.GreenLignt]}>Mes commandes</Text>
        <View style={{height:'auto',width:'90%',alignSelf:'center'}}>
          <Text>Liste en dessous</Text>

          {
           MyHistorique?.length < 1 && <Text style={{textAlign:'center',marginTop:50}}>Votre historique est vide !!!</Text>
          }

          {
            MyHistorique?.map((item,index) => 
              <TouchableOpacity  onPress={onPress} onPressIn ={() => sethistoriqueSelected(item)} style={{backgroundColor:"#B0E9B3",height:'auto',width:'100%',padding:10,marginTop:10,borderRadius:10}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View>
                  <Text>Course de <Text style={{fontWeight:'bold'}}>{item?.date}</Text></Text>
                  <Text>{item?.state == "close" && "Annuler"} {item?.state == "start" && "En cours"} {item?.state == "end" && "Terminer"}</Text>

              </View>
                  <View>
                    <View
                      style={{
                      backgroundColor: "#EFEFEF",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      width: "auto",
                      padding: 5,
                      }}
                      >
                      <Text style={{ color: "black" }}>998XDFS</Text>
                      </View>
                      <Image style={[{resizeMode:'contain',width:80,alignSelf:'center'}]} source={Iconsimg.sysRaceCovImg}/>
                  </View>
              </View>
          </TouchableOpacity>
            )
          }
           
        </View>
        <BottomSheet2 ref={ref}>
          <View style={{ flex: 1,borderWidth:2,backgroundColor:"#B0E9B3",borderColor:Colors.GreenLignt_BG.backgroundColor, borderRadius:20,paddingVertical:10,paddingHorizontal:10}}>
          <View style={{height:130,zIndex:4,borderRadius:10,overflow:'hidden'}}>
              <MapView
                   mapType="standard"
                   scrollEnabled={false}
                   initialRegion={{
                   latitude: historiqueSelected?.whereYouAreLat == null ? defaultMaps?.longitude : parseFloat(historiqueSelected?.whereYouAreLat),
                   longitude: historiqueSelected?.whereYouAreLng == null ? defaultMaps?.latitude : parseFloat(historiqueSelected?.whereYouAreLng),
                   latitudeDelta: 0.000864195044303443,
                   longitudeDelta: 0.0000142817690068,
                 }}
                 style={{flex:1}}
                 
               >
               <MapViewDirections
                strokeWidth={3}
                strokeColor={Colors.GreenLignt.color}
                origin={{latitude:  parseFloat(historiqueSelected?.whereYouAreLat) , longitude: parseFloat(historiqueSelected?.whereYouAreLng)}}
                destination={{latitude: parseFloat(historiqueSelected?.whereYouGoingLat) , longitude: parseFloat(historiqueSelected?.whereYouGoingLng)}}
                apikey={GOOGLE_MAPS_APIKEY}
              />
             </MapView>
          </View>
          <Text/>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{color:'black',fontWeight:'bold',fontSize:17}}>Course à {historiqueSelected?.date?.split(' ')[1]}</Text>
              <View style={{}}>
                <View
                style={{
                  backgroundColor: "#EFEFEF",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  width: "auto",
                  padding: 5,
                }}
              >
                <Text style={{ color: "black" }}>{historiqueSelected?.driverData?.numberMatricles}</Text>
              </View>
                <Image style={[{resizeMode:'contain',width:70,alignSelf:'center'}]} source={Iconsimg.sysRaceCovImg}/>
              </View>
          </View>
          <Text/>
            <View style={{borderBottomWidth:1,borderColor:'black',opacity:0.2}}/>
          <View
                style={{
                  justifyContent: "center",
                  borderRadius: 5,
                  width: "auto",
                  height:50,
                  padding: 5,
                }}
              >
                <Text style={{ color: "black" }}>{historiqueSelected?.whereYouAre}</Text>
          </View>
          <View style={{borderBottomWidth:1,borderColor:'black',opacity:0.2}}/>
           <View
                style={{
                  justifyContent: "center",
                  borderRadius: 5,
                  width: "auto",
                  height:50,
                  padding: 5,
                }}
              >
                <Text style={{ color: "black" }}>{historiqueSelected?.whereYouGoing}</Text>
          </View>
          <View style={{opacity:0.6,height:20,backgroundColor:'white',marginLeft:-10,marginRight:-10}}/>
          
          <View
                style={{
                  justifyContent: "space-between",
                  alignItems:'center',
                  borderRadius: 5,
                  width: "auto",
                  flexDirection:'row',
                  height:50,
                  padding: 5,
                }}
              >
                <Text style={{ color: "black" }}>Coût Total</Text>
                <Text style={{ color: "black" , fontWeight:'bold'}}>{historiqueSelected?.price} FCFA</Text>

          </View>
          <View style={{opacity:0.6,height:20,backgroundColor:'white',marginLeft:-10,marginRight:-10}}/>

          <View
                style={{
                  justifyContent: "center",
                  borderRadius: 5,
                  width: "auto",
                  height:50,
                  padding: 5,
                }}
              >
                <Text style={{ color: "black",fontSize:10 }}>Conducteur</Text>

                <Text style={{ color: "black" }}>{historiqueSelected?.driverData?.fullName}</Text>
          </View>
          <View style={{borderBottomWidth:1,borderColor:'black',opacity:0.2}}/>
          <View
                style={{
                  justifyContent: "center",
                  borderRadius: 5,
                  width: "auto",
                  height:50,
                  padding: 5,
                }}
              >
                <Text style={{ color: "black",fontSize:10 }}>Type de vehicule</Text>

                <Text style={{ color: "black" }}>{historiqueSelected?.driverData?.carBrand}</Text>
          </View>
          </View>
        </BottomSheet2>

      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: 'black',
    opacity: 0.6,
  },
});

