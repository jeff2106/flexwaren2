/**
 * Sample React Native AccueilCovoiturage
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
    Button,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Alert, Platform,
    TouchableWithoutFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import * as geolib from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import { StackActions } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Pusher from 'pusher-js/react-native';
import MapViewDirections from 'react-native-maps-directions';

//My Src Import

import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';
import HeaderCov from '../../../Components/headerCov';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//End




const AccueilCovoiturage: () => Node = ({navigation,route}) => {


  const {u_data,timestamp } = route.params;
  const popAction = StackActions.pop(1);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [whereAreYou, setwhereAreYou] = React.useState("");
  const [whereYouGo, setwhereYouGo] = React.useState("");
  const [alwaysAvailable, setAlwaysAvailable] = React.useState(1);
  const [isCommand, setIsCommand] = React.useState(true);
  const [locationPosition, setlocationPosition] = React.useState([]);
  const [LatLongLocationSelected, setLatLongLocationSelected] = React.useState();
  const [LatLongLocationSelected2, setLatLongLocationSelected2] = React.useState();
  const [locationPosition2, setlocationPosition2] = React.useState();
  const [Price, setPrice] = React.useState();




  const [lastID, setlastID] = React.useState();
  const origin = {latitude: 37.78825, longitude: -122.4324};
  const destination = {latitude: 37.771707, longitude: -122.4053769};
  const [TimeOutOrders,setTimeOutOrders] = React.useState(30);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDSbg654fWaJihkk3FIk52Je8viclmsYCU';
  const [error, setError] = React.useState("");
  const [ListView1, setListView1] = React.useState(false);
  const [ListView2, setListView2] = React.useState(false);
  const [isActive1, setisActive1] = React.useState(false);
  const [isActive2, setisActive2] = React.useState(false);



  const [position, setPosition] = React.useState({
          latitude: 0,
          longitude: 0
      });
  const initialState = {
     latitude: 0,
     longitude: 0,
     latitudeDelta: 0.120864195044303443,
     longitudeDelta: 0.1220142817690068,
   };
   const [curentPosition, setCurentPosition] = React.useState(initialState);


  //Avoir la position de l'utilisateur
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
  //End

/*
  React.useEffect(() => {
        const watchId = Geolocation.watchPosition(pos => {
          console.log("========> Log",pos);
            setError("");
            setPosition({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            });
        }, e => setError(e.message));
        return () => Geolocation.clearWatch(watchId);
    }, [position]);
*/

//Fonction pour create une course

let KilometersSplit;
let PriceSplit;

if( LatLongLocationSelected?.lat && LatLongLocationSelected2?.lat ){
  const KilometersCheck = geolib.getDistance(
    { latitude: LatLongLocationSelected?.lat, longitude: LatLongLocationSelected?.lng },
    { latitude: LatLongLocationSelected2?.lat, longitude: LatLongLocationSelected2?.lng }
    );
  let PriceDisplay;
  const ConvertKM = geolib.convertDistance(KilometersCheck, 'km');
  ConvertKM > 1 ? (PriceDisplay = ConvertKM * 210) : (PriceDisplay = ConvertKM * 0.210);
  KilometersSplit = ConvertKM?.toString()?.split('.')[0];
  PriceSplit = PriceDisplay?.toString()?.split('.')[0];
}else{
  KilometersSplit = 0;
  PriceSplit = 0;
}

function CreateOrders(){

  if(LatLongLocationSelected?.lat && LatLongLocationSelected2?.lat){

    const  Kilometers =  geolib.getDistance(
    { latitude: LatLongLocationSelected?.lat, longitude: LatLongLocationSelected?.lng },
    { latitude: LatLongLocationSelected2?.lat, longitude: LatLongLocationSelected2?.lng }
    );
   let price;
      const kT = geolib.convertDistance(Kilometers, 'km');

      kT > 1 ? (price = kT * 210) : (price = kT * 0.210);

    let KTSPLIT = kT?.toString()?.split('.')[0];
    let PRICESPLIT = price?.toString()?.split('.')[0];

    setPrice({price: PRICESPLIT, Km: KTSPLIT });
    var formdata = new FormData();
    formdata.append("uidCustomers", u_data?.id);
    formdata.append("channel", "covreservation");
    formdata.append("whereYouAre", whereAreYou?.description);
    formdata.append("whereYouGoing", whereYouGo?.description);
    formdata.append("numberCustomers", u_data?.number);
    formdata.append("Km", KTSPLIT);
    formdata.append("price", PRICESPLIT);
    formdata.append("whereYouAreLat", LatLongLocationSelected?.lat);
    formdata.append("whereYouAreLng", LatLongLocationSelected?.lng);
    formdata.append("date", "");
    formdata.append("whereYouGoingLat", LatLongLocationSelected2?.lat);
    formdata.append("whereYouGoingLng", LatLongLocationSelected2?.lng);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };


    fetch("https://prumad.com/API/index2.php?Orders", requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsCommand(!isCommand);

        setlastID(result?.lastID);
      })
      .catch(error => console.log('error', Alert.alert("Important !!!","Veuillez verifier votre internet ou fermer l'application et re ouvrer là")));


  }else{
    Alert.alert("Attention !!!","Vous devez remplir correctement les champs s'il vous plait !!!");
  }
}


//======> Fonction pour ecouter voir si la course à été accepter
React.useEffect(() => {

    Pusher.logToConsole = false;

    var pusher = new Pusher('e4ad133537d71dc9e689', {
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('Covoiturage');
    channel.bind('covreservation', function(data) {

      if(data?.PassagerID == u_data?.id && data?.status == 202){

        var formdata = new FormData();

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`https://prumad.com/API/index2.php?OrdersAccepte=${data?.idRace}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('=====> lastID: ',data?.idRace);
            navigation.navigate('FetchDriversCovoiturage',{
              curentPositionNext: curentPosition,
              courseDetails: result,
              u_data:u_data,
              timestamp:timestamp
            });

          })
          .catch(error => console.log('error', error));

          setIsCommand(!isCommand);
        }

      });
},[]);

//End


//======> Annuler une course
function Annuler(){
  var requestOptions = {
  method: 'DELETE',
  redirect: 'follow'
  };
  fetch(`https://prumad.com/API/index2.php?CancelRide=${u_data?.id}`, requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result);})
  .catch(error => console.log('error', error));
  setIsCommand(!isCommand)
}
//End

//=====> CountDown pour desactiver la course si aucune personne ne l'accepte
React.useEffect(() => {
  if(isCommand == false){
    if(TimeOutOrders > 0){
      const interval = setInterval(() => {

        setTimeOutOrders(TimeOutOrders - 1);
      }, 1000);
      return () => clearInterval(interval);
    }else{
      setIsCommand(!isCommand);
      Annuler();
      setTimeOutOrders(30);
    }
  }else{

  }
},[TimeOutOrders]);

//End



//=====> My Auto completion custom pour le champs 1
function getLocationAddress(text){

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&language=fr&key=${GOOGLE_MAPS_APIKEY}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setlocationPosition(result?.predictions)
      })
      .catch(error => console.log('error', error));
  }
React.useEffect(() => {
    getLocationAddress(whereAreYou);

    //Avoir les coordonnée long et lat
    if(whereAreYou?.description){
      getLatLngInput1(whereAreYou?.place_id)
    }
  },[whereAreYou]);
function getLatLngInput1(text){

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${text}&key=${GOOGLE_MAPS_APIKEY}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLatLongLocationSelected(result?.result?.geometry?.location);
      })
      .catch(error => console.log('error', error));
  }
//End



//=====> My Auto completion custom pour le champs 2
function getLocationAddress2(text){

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&language=fr&key=${GOOGLE_MAPS_APIKEY}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setlocationPosition2(result?.predictions)
      })
      .catch(error => console.log('error', error));
  }
React.useEffect(() => {
    getLocationAddress2(whereYouGo);
    //Avoir les coordonnée long et lat
    if(whereYouGo?.description){
      getLatLngInput2(whereYouGo?.place_id)
    }
  },[whereYouGo]);
function getLatLngInput2(text){

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${text}&key=${GOOGLE_MAPS_APIKEY}`, requestOptions)
      .then(response => response.json())
      .then(result => {

        setLatLongLocationSelected2(result?.result?.geometry?.location);
      })
      .catch(error => console.log('error', error));
  }
//End

  return (

    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
                <TouchableOpacity style={[{position:'absolute',top:10,zIndex:4}]} onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" size={30} style={[Colors.Dark]} />
                </TouchableOpacity>
                {
                    isActive1 == false &&
                    whereAreYou !=  "" &&
                    <ScrollView style={{position:'absolute',top:0,right:0,left:0,zIndex:3,height: 120,overflow:'scroll'}}>
                        {

                            locationPosition?.length > 0 &&
                            locationPosition?.map((item,index) =>
                                <TouchableOpacity onPress={() => {setisActive1(true);setwhereAreYou(item);}} key={index} style={{borderBottomWidth:1,height:50,alignItems:'center',flexDirection:'row',backgroundColor:'white',zIndex:5}}>
                                    <SimpleLineIcons name="location-pin" size={15} style={[Colors.GreenLignt,{zIndex:6}]} />
                                    <Text style={{fontWeight:'bold',color:'black',marginLeft:10}}>{item?.description}</Text>
                                </TouchableOpacity>
                            )

                        }
                    </ScrollView>
                }
                {
                    isActive2 == false &&
                    whereYouGo !=  "" &&
                    <ScrollView style={{position:'absolute',top:0,right:0,left:0,backgroundColor:'white',zIndex:3,height:120  ,overflow:'scroll'}}>
                        {

                            locationPosition2?.length > 0 &&
                            locationPosition2?.map((item,index) =>
                                <TouchableOpacity onPress={() => {setisActive2(true);setwhereYouGo(item);}} key={index} style={{borderBottomWidth:1,height:50,marginRight:10,marginLeft:10,alignItems:'center',flexDirection:'row'}}>
                                    <SimpleLineIcons name="location-pin" size={15} style={[Colors.GreenLignt]} />
                                    <Text style={{fontWeight:'bold',color:'black',marginLeft:10}}>{item?.description}</Text>
                                </TouchableOpacity>
                            )

                        }

                    </ScrollView>
                }
                <MapView
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    mapType="standard"
                    followsUserLocation={true}
                    initialRegion={curentPosition}
                    style={styles.map}

                >
                    <MapViewDirections
                        strokeWidth={3}
                        strokeColor={Colors.GreenLignt.color}
                        origin={origin}
                        destination={destination}
                        apikey={"AIzaSyDSbg654fWaJihkk3FIk52Je8viclmsYCU"}
                    />
                </MapView>
                {
                    isCommand &&
                    <View style={{flex:1}}>
                        <TouchableOpacity style={[{position:'absolute',top:10, right:1000 ,borderRadius:100,width:50,height:50,justifyContent:'center',alignItems:'center'},Colors.darkGreen_BG]} onPress={() => navigation.openDrawer()}>
                            <Icon name="navigation" size={30} style={[Colors.White,{transform:[{rotate:'20deg'}]}]} />
                        </TouchableOpacity>
                        <View style={[{position:'absolute',height:windowHeight/2.5,width:windowWidth, bottom:0,backgroundColor:'white',borderRadius:12,padding:20}]}>
                            <View style={[{height:windowHeight/12,}]}>
                                <Text style={[Colors.GreenLignt,Generalstyle.bold]}>Ou êtes-vous ?</Text>

                                <TextInput
                                    value={!whereAreYou?.description ? whereAreYou : whereAreYou?.description}
                                    onFocus={(e) => {
                                        setwhereAreYou("");
                                        setLatLongLocationSelected("");
                                        setListView1(true);
                                        setisActive1(false);
                                    }}
                                    onBlur={() => {
                                        setListView1(false);
                                    }}
                                    onChangeText={(val) =>
                                        setwhereAreYou(val)
                                    }
                                    style={{height:40,color:'black'}}
                                    placeholder={"......"} />

                                <View style={{borderWidth:0.5,opacity:0.2}}/>
                            </View>
                            <View style={[{height:windowHeight/12}]}>
                                <Text style={[Colors.GreenLignt,Generalstyle.bold]}>Ou allez-vous ?</Text>
                                <TextInput
                                    value={!whereYouGo?.description ? whereYouGo : whereYouGo?.description}
                                    onFocus={(e) => {
                                        setwhereYouGo("");
                                        setLatLongLocationSelected2("");
                                        setListView2(true);
                                        setisActive2(false);
                                    }}
                                    onBlur={() => {
                                        setListView2(false);
                                        setisActive2(false);
                                    }}
                                    onChangeText={(val) =>
                                        setwhereYouGo(val)}
                                    style={{height:40,color:'black'}}
                                    placeholder={"......"}
                                />
                                <View style={{borderWidth:0.5,opacity:0.2}}/>
                            </View>
                            <View style={[{height:windowHeight/10,alignSelf:'center',width:200,alignItems:'center', justifyContent:'center',borderRadius:12,margin:10, flexDirection:'row'},Generalstyle.shadow]}>
                                <Text style={{textAlign:'center',marginRight:10,fontWeight:'bold',color:'black'}}> {PriceSplit } XOF </Text>
                                <Image style={[{resizeMode:'contain',width:100,alignSelf:'center'}]} source={Iconsimg.sysRaceCovImg}/>
                                <Icons name="infocirlce" size={20} style={[Colors.Dark,{position:'absolute',top:3,right:10,opacity:0.5}]} />
                            </View>
                            <View style={[{height:windowHeight/15}]}>

                                <TouchableOpacity onPress={() => {
                                    CreateOrders();
                                }}
                                                  style={[{alignSelf:'center',width:'80%',height:'100%',borderRadius:30,justifyContent:'center',alignItems:'center'},Colors.GreenLignt_BG]}>
                                    <Text style={[{color:'white'},Generalstyle.bold]} >COMMANDER</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                }

                {
                    !isCommand &&

                    <View style={{flex:1,backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>


                        <View>

                            <Image source={Iconsimg.sys_Localisation}  style={{resizeMode:'contain',width:30,height:30,alignSelf:'center',position:'absolute',top:windowHeight/2.5,zIndex:2}}/>
                            <Image source={require('../sys_pulseFecthing.gif')}  style={{resizeMode:'contain',width:1000,alignSelf:'center',position:'absolute',top:windowHeight/4,zIndex:1}}/>


                            <View style={[{position:'absolute',height:windowHeight/4.5,width:windowWidth/1.04,alignSelf:'center', bottom:-windowWidth*1.74,backgroundColor:'white',borderRadius:12,padding:20}]}>
                                <TouchableOpacity style={{justifyContent:'space-between',flexDirection:'row'}}>
                                    <Text style={{color:'black'}}>Recherche de vehicule</Text>
                                    <Text style={{color:'black'}}>{TimeOutOrders}s</Text>

                                </TouchableOpacity>
                                <View style={{borderWidth:0.5,opacity:0.2,marginTop:20}}/>
                                <View>
                                    <TouchableOpacity onPress={() => Annuler()} style={[Generalstyle.shadow,{width:40,height:40,marginTop:20, borderRadius:100,alignSelf:'center',alignItems:'center',justifyContent:'center'}]}>
                                        <Icons name="close" size={20} style={[Colors.red,]} />
                                    </TouchableOpacity>
                                    <Text/>
                                    <Text style={{fontSize:20,color:'black',alignSelf:'center',marginTop:4}}>Annuler la commande</Text>
                                </View>

                            </View>
                        </View>

                    </View>
                }
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    containers: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    container: {
        flex: 1
    },
    inner: {
        flex:1
    }
});
export default AccueilCovoiturage;

/*

const styles = StyleSheet.create({

});

<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 500} style={{flex:1}}>
          <View style={[styles.container,{
                  flex: 1

          }]}>
              <TouchableOpacity style={[{position:'absolute',top:10,zIndex:4}]} onPress={() => navigation.openDrawer()}>
                  <Icon name="menu" size={30} style={[Colors.Dark]} />
              </TouchableOpacity>
              {
                  isActive1 == false &&
                  whereAreYou !=  "" &&
                  <ScrollView style={{position:'absolute',top:0,right:0,left:0,zIndex:3,height: 120,overflow:'scroll'}}>
                      {

                          locationPosition?.length > 0 &&
                          locationPosition?.map((item,index) =>
                              <TouchableOpacity onPress={() => {setisActive1(true);setwhereAreYou(item);}} key={index} style={{borderBottomWidth:1,height:50,alignItems:'center',flexDirection:'row',backgroundColor:'white',zIndex:5}}>
                                  <SimpleLineIcons name="location-pin" size={15} style={[Colors.GreenLignt,{zIndex:6}]} />
                                  <Text style={{fontWeight:'bold',color:'black',marginLeft:10}}>{item?.description}</Text>
                              </TouchableOpacity>
                          )

                      }
                  </ScrollView>
              }

              {
                  isActive2 == false &&
                  whereYouGo !=  "" &&
                  <ScrollView style={{position:'absolute',top:0,right:0,left:0,backgroundColor:'white',zIndex:3,height:120  ,overflow:'scroll'}}>
                      {

                          locationPosition2?.length > 0 &&
                          locationPosition2?.map((item,index) =>
                              <TouchableOpacity onPress={() => {setisActive2(true);setwhereYouGo(item);}} key={index} style={{borderBottomWidth:1,height:50,marginRight:10,marginLeft:10,alignItems:'center',flexDirection:'row'}}>
                                  <SimpleLineIcons name="location-pin" size={15} style={[Colors.GreenLignt]} />
                                  <Text style={{fontWeight:'bold',color:'black',marginLeft:10}}>{item?.description}</Text>
                              </TouchableOpacity>
                          )

                      }

                  </ScrollView>
              }
              <MapView
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  mapType="standard"
                  followsUserLocation={true}
                  initialRegion={curentPosition}
                  style={styles.map}

              >
                  <MapViewDirections
                      strokeWidth={3}
                      strokeColor={Colors.GreenLignt.color}
                      origin={origin}
                      destination={destination}
                      apikey={"AIzaSyDSbg654fWaJihkk3FIk52Je8viclmsYCU"}
                  />
              </MapView>


              {
                  isCommand &&
                  <View>
                      <TouchableOpacity style={[{position:'absolute',top:10, right:1000 ,borderRadius:100,width:50,height:50,justifyContent:'center',alignItems:'center'},Colors.darkGreen_BG]} onPress={() => navigation.openDrawer()}>
                          <Icon name="navigation" size={30} style={[Colors.White,{transform:[{rotate:'20deg'}]}]} />
                      </TouchableOpacity>
                      <View style={[{position:'absolute',height:windowHeight/2.5,width:windowWidth, bottom:0,backgroundColor:'white',borderRadius:12,padding:20}]}>
                          <View style={[{height:windowHeight/12,}]}>
                              <Text style={[Colors.GreenLignt,Generalstyle.bold]}>Ou êtes-vous ?</Text>

                              <TextInput
                                  value={!whereAreYou?.description ? whereAreYou : whereAreYou?.description}
                                  onFocus={(e) => {
                                      setwhereAreYou("");
                                      setLatLongLocationSelected("");
                                      setListView1(true);
                                      setisActive1(false);
                                  }}
                                  onBlur={() => {
                                      setListView1(false);
                                  }}
                                  onChangeText={(val) =>
                                      setwhereAreYou(val)
                                  }
                                  style={{height:40,color:'black'}}
                                  placeholder={"......"} />

                              <View style={{borderWidth:0.5,opacity:0.2}}/>
                          </View>
                          <View style={[{height:windowHeight/12}]}>
                              <Text style={[Colors.GreenLignt,Generalstyle.bold]}>Ou allez-vous ?</Text>
                              <TextInput
                                  value={!whereYouGo?.description ? whereYouGo : whereYouGo?.description}
                                  onFocus={(e) => {
                                      setwhereYouGo("");
                                      setLatLongLocationSelected2("");
                                      setListView2(true);
                                      setisActive2(false);
                                  }}
                                  onBlur={() => {
                                      setListView2(false);
                                      setisActive2(false);
                                  }}
                                  onChangeText={(val) =>
                                      setwhereYouGo(val)}
                                  style={{height:40,color:'black'}}
                                  placeholder={"......"}
                              />
                              <View style={{borderWidth:0.5,opacity:0.2}}/>
                          </View>
                          <View style={[{height:windowHeight/10,alignSelf:'center',width:200,alignItems:'center', justifyContent:'center',borderRadius:12,margin:10, flexDirection:'row'},Generalstyle.shadow]}>
                              <Text style={{textAlign:'center',marginRight:10,fontWeight:'bold',color:'black'}}> {PriceSplit } XOF </Text>
                              <Image style={[{resizeMode:'contain',width:100,alignSelf:'center'}]} source={Iconsimg.sysRaceCovImg}/>
                              <Icons name="infocirlce" size={20} style={[Colors.Dark,{position:'absolute',top:3,right:10,opacity:0.5}]} />
                          </View>
                          <View style={[{height:windowHeight/15}]}>

                              <TouchableOpacity onPress={() => {
                                  CreateOrders();
                              }}
                                                style={[{alignSelf:'center',width:'80%',height:'100%',borderRadius:30,justifyContent:'center',alignItems:'center'},Colors.GreenLignt_BG]}>
                                  <Text style={[{color:'white'},Generalstyle.bold]} >COMMANDER</Text>
                              </TouchableOpacity>
                          </View>

                      </View>

                  </View>
              }

              {
                  !isCommand &&

                  <View style={{flex:1,backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>


                      <View>

                          <Image source={Iconsimg.sys_Localisation}  style={{resizeMode:'contain',width:30,height:30,alignSelf:'center',position:'absolute',top:windowHeight/2.5,zIndex:2}}/>
                          <Image source={require('../sys_pulseFecthing.gif')}  style={{resizeMode:'contain',width:1000,alignSelf:'center',position:'absolute',top:windowHeight/4,zIndex:1}}/>


                          <View style={[{position:'absolute',height:windowHeight/4.5,width:windowWidth/1.04,alignSelf:'center', bottom:-windowWidth*1.74,backgroundColor:'white',borderRadius:12,padding:20}]}>
                              <TouchableOpacity style={{justifyContent:'space-between',flexDirection:'row'}}>
                                  <Text style={{color:'black'}}>Recherche de vehicule</Text>
                                  <Text style={{color:'black'}}>{TimeOutOrders}s</Text>

                              </TouchableOpacity>
                              <View style={{borderWidth:0.5,opacity:0.2,marginTop:20}}/>
                              <View>
                                  <TouchableOpacity onPress={() => Annuler()} style={[Generalstyle.shadow,{width:40,height:40,marginTop:20, borderRadius:100,alignSelf:'center',alignItems:'center',justifyContent:'center'}]}>
                                      <Icons name="close" size={20} style={[Colors.red,]} />
                                  </TouchableOpacity>
                                  <Text/>
                                  <Text style={{fontSize:20,color:'black',alignSelf:'center',marginTop:4}}>Annuler la commande</Text>
                              </View>

                          </View>
                      </View>

                  </View>
              }


          </View>
      </KeyboardAvoidingView>

 */
