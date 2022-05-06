/**
 * Sample React Native CourseStart
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type { Node } from "react";
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
  Platform,
  Share,
  Linking
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";


import Icons from "react-native-vector-icons/AntDesign";
import Pulse from "react-native-pulse";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import Geolocation from "@react-native-community/geolocation";
//My Src Import
import Colors from "../../../Utils/Colors.js";
import Iconsimg from "../../../Utils/Img";
import Fr from "../../../Utils/Fr";
import Generalstyle from "../../../Utils/GeneralStyle";
import HeaderCov from "../../../Components/headerCov";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Pusher from 'pusher-js/react-native';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


  const ASPECT_RATIO = windowWidth / windowHeight;
  const latitudeDelta= 0.1220142817690068;
  const  longitudeDelta = latitudeDelta * ASPECT_RATIO;

const CourseStart: () => Node = ({ navigation, route }) => {
   const { curentPositionNext, u_data,timestamp,courseDetails } = route.params;

  const [modalVisible, setModalVisible] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [isSecurite, setIsSecurite] = React.useState(false);
  const [IsWarn, setIsWarn] = React.useState(false);
  const [userContact, setuserContact] = React.useState(false);
  const [Kilometers, setKilometers] = React.useState();
  const [Hourse, setHourse] = React.useState();
  const [NumberPrivacy, setNumberPrivacy] = React.useState();

  const [isCommand, setIsCommand] = React.useState(true);
  const [isDriverLicence, setisDriverLicence] = React.useState(false);
  const [Det, setDet] = React.useState({ latitude: 5.3866984, longitude: -3.987435 });


  

  const GOOGLE_MAPS_APIKEY = "AIzaSyDSbg654fWaJihkk3FIk52Je8viclmsYCU";
  const initialState = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  };
  const [curentPosition, setCurentPosition] = React.useState(initialState);
  const destination = { latitude: Det.latitude , longitude: Det.longitude };
  const onShare = async () => {
    try{
      const result = await Share.share({
        message: `Bonjour , je suis presentement dans le vehicule et je me dirige vers ${courseDetails?.whereYouGoing} , voici le numero du chaffeurs ${courseDetails?.driverData?.number} et le Matricule : ${courseDetails?.DriverData?.numberMatricles}` 
      });
      if(result.action == Share.sharedAction){
        if(result.activityType){
          console.log("ok");
        }else{
          console.log("bien");
        }
      }else if (result.action === Share.dismissedAction){
        console.log('dismissedActionm');
      }
    }catch(error) {
      console.log(error);
    }
  }
  function MyNumberPrivacy(){
    fetch(`http://prumad.com/API/index2.php?getPrivacytNumber=${u_data?.id}`)
    .then(response => response.json())
    .then(result => {setNumberPrivacy(result);})
    .catch(err => console.log(err)) 
  }
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
    MyNumberPrivacy()
    
  }, [curentPosition?.latitude]);

   React.useEffect(() => {
        var requestOptions = {
          method:'GET',
          redirect:'follow'
        };

        fetch(`https://prumad.com/API/index2.php?currentLatLongDrivers=${courseDetails?.id}`,requestOptions)
        .then(response => response.json())
        .then(response => {
           //console.log(response);

          setDet({latitude: parseFloat(response?.uidLat) ,longitude: parseFloat(response?.uidLng) });
        })
        .catch(error =>  console.log(error))
     

  },[Det.latitude]);

   Pusher.logToConsole = false;

  var pusher = new Pusher('e4ad133537d71dc9e689', {
    cluster: 'mt1'
  });

  var channel = pusher.subscribe('Covoiturage');
  channel.bind('GoRideEndNow', function(data) {

  if(data?.idRace ==  courseDetails?.id){
    
     navigation.navigate("AccueilCovoiturage",{u_data:u_data,timestamp:timestamp});
      setTimeout(() => {
       
      },2000)
    }
  
}); 

  return (
    <View style={styles.container}>
     
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType='standard'
        followsUserLocation={true}
        initialRegion={
          curentPositionNext
        }
        style={styles.map}
        >
        <MapView.Marker
          coordinate={{longitude: parseFloat(courseDetails?.whereYouGoingLng) , latitude: parseFloat(courseDetails?.whereYouGoingLat) }}

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
            origin={{
            latitude: curentPosition?.latitude,
            longitude: curentPosition?.longitude,
              }} 
            destination={{longitude: parseFloat(courseDetails?.whereYouGoingLng) , latitude: parseFloat(courseDetails?.whereYouGoingLat) }}
          apikey={GOOGLE_MAPS_APIKEY}
          onReady={result => {
            const number = result.duration.toString();
            const distance = result.distance.toString();
            setHourse(number.split('.')[0]);
            setKilometers(distance);
          }}
        />
      </MapView>

      {isCommand && (
        <View
          style={[
            {
              position: "absolute",
              height: "auto",
              width: windowWidth / 1.04,
              alignSelf: "center",
              bottom: 25,
              backgroundColor: "white",
              borderRadius: 12,
              padding: 20,
            },
          ]}
        >
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={[
                  { color: "black"},
                  Generalstyle.bold,
                ]}
              >
                Arrive dans ~{Hourse} min
              </Text>
              <Text style={{ color: "black" }}>{courseDetails?.driverData?.carBrand}</Text>
              <Text />
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
                <Text style={{ color: "black" }}>{courseDetails?.driverData?.numberMatricles}</Text>
              </View>
              <Image
                style={[
                  { resizeMode: "contain", width: 50, alignSelf: "center" },
                ]}
                source={Iconsimg.sysRaceCovImg}
              />
            </View>
          </View>
          <View style={{ borderWidth: 0.5, opacity: 0.2, marginTop: 10 }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <View>
              <TouchableOpacity
                onPress={() => setIsCommand(!isCommand)}
                style={[
                  Generalstyle.shadow,
                  {
                    width: 40,
                    overflow: "hidden",
                    height: 40,
                    marginTop: 20,
                    borderRadius: 100,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                 <Image
                  style={[
                    {
                      resizeMode: "contain",
                      width: '100%',
                      height:70,
                      overflow:'hidden',
                      alignSelf: "center",
                    },
                  ]}
                  source={{uri: `data:image/jpeg;base64,${courseDetails?.driverData?.photoProfil}`}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  width: 80,
                  color: "black",
                }}
              >
               {courseDetails?.driverData?.fullName}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => setIsSecurite(!isSecurite)}
                style={[
                  Generalstyle.shadow,
                  {
                    width: 40,
                    height: 40,
                    marginTop: 20,
                    borderRadius: 100,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Icon name='security' size={20} style={[Colors.Dark]} />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  width: 100,
                  color: "black",
                }}
              >
                Securité
              </Text>
            </View>

            
          </View>
        </View>
      )}

      {!isCommand && (
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
          <View>
            <Image
             source={{uri: `data:image/jpeg;base64,${courseDetails?.driverData?.photoProfil}`}}
               style={{
                resizeMode: "cover",
                width: 130,
                height: 130,
                alignSelf: "center",
                position: "absolute",
                top: windowHeight / 6,
                zIndex: 2,
                borderRadius:100,
                overflow:'hidden'
              }}
            />

            <View
              style={[
                {
                  position: "absolute",
                  height: windowHeight / 1.5,
                  width: windowWidth / 1.04,
                  alignSelf: "center",
                  bottom: -windowWidth * 1.77,
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 20,
                },
              ]}
            >
              <View style={{ marginTop: windowWidth / 15 }} />

              <View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: "black",
                      marginTop: 10,
                      fontStyle: "italic",
                      fontSize: 20,
                    }}
                  >
                    {courseDetails?.driverData?.fullName}
                  </Text>
                  <Text style={{ color: "black", fontSize: 10 }}>{courseDetails?.driverData?.carBrand}</Text>
                  <Text style={{ color: "black", fontSize: 10 }}>
                    Matricule : {courseDetails?.driverData?.numberMatricles}
                  </Text>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      width: windowWidth,
                      paddingHorizontal: 50,
                    }}
                  >
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={{color:"black"}}>4.5</Text>
                      <Text style={{color:"black"}}>Evaluations</Text>
                    </View>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={{color:"black"}} >---</Text>
                      <Text style={{color:"black"}} >---</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{ borderWidth: 0.5, opacity: 0.2, marginTop: 10 }}
                />

                {!isDriverLicence ?
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                  >
                  <View>
                    <TouchableOpacity
                      onPress={() => setisDriverLicence(!isDriverLicence)}
                      style={[
                        Generalstyle.shadow,
                        {
                          width: 40,
                          height: 40,
                          marginTop: 20,
                          borderRadius: 100,
                          alignSelf: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <FontAwesome
                        name='drivers-license-o'
                        size={20}
                        style={[Colors.Dark]}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        width: 100,
                        color: "black",
                      }}
                    >
                      Voir le permis de conduite
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                  Linking.openURL(`tel:${courseDetails?.driverData?.number}`)
                }}
                      style={[
                        Generalstyle.shadow,
                        {
                          width: 40,
                          height: 40,
                          marginTop: 20,
                          borderRadius: 100,
                          alignSelf: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Foundation
                        name='telephone'
                        size={20}
                        style={[Colors.Dark]}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        width: 100,
                        color: "black",
                      }}
                    >
                      Contacter le conducteur
                    </Text>
                  </View>
                </View> : 
                <TouchableOpacity onPress={() => setisDriverLicence(!isDriverLicence)} style={{overflow:'hidden',borderRadius:12,marginTop:10, width:windowWidth/1.17,alignItems:'center',height:windowHeight/3}}>
                 <Image style={{height:"100%",width:"100%",resizeMode:'cover'}} source={{uri: `data:image/jpeg;base64,${courseDetails?.driverData?.photoDrivingLicense}`}}/>


                </TouchableOpacity> }
                

                <TouchableOpacity
                  onPress={() => setIsCommand(!isCommand)}
                  style={[
                    Generalstyle.shadow,
                    Colors.GreenLignt_BG,
                    {
                      position: "absolute",
                      bottom: !isDriverLicence ? -windowHeight / 7 * 2 : -windowHeight / 24.3 * 2,
                      width: "50%",
                      height: "auto",
                      padding: 5,
                      borderRadius: 8,
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                      alignSelf: "center",
                    }}
                  >
                    Fermer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      {isSecurite && (
        <View
	          style={[
	            {
	              position: "absolute",
	              height: "auto",
	              width: windowWidth / 1.04,
	              alignSelf: "center",
	              bottom: 25,
	              backgroundColor: "white",
	              borderRadius: 12,
	              padding: 20,
	            },
	          ]}
	        >
	        <TouchableOpacity onPress={() => setIsSecurite(!isSecurite)} >
	        <Icon name='arrow-left'size={25}style={[Colors.Dark]}
	                      /></TouchableOpacity>
	         <Text/>
	          <View
	            style={{ justifyContent: "space-between", flexDirection: "row" }}
	          >

	            <View style={{ justifyContent: "center", alignItems: "center" }}>
	              <Text style={{ color: "black",fontSize:20 }}>Securité</Text>
	              <Text />
	              <Text />

	            </View>
	           
	          </View>
	          <View
	            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
	          >
	            <View>
	              <TouchableOpacity
	                onPress={() => setuserContact(!userContact)}
	                style={[
	                  Generalstyle.shadow,
	                  {
	                    width: 50,
	                    overFlow: "hidden",
	                    height: 50,
	                    marginTop: 20,
	                    borderRadius: 100,
	                    alignSelf: "center",
	                    alignItems: "center",
	                    justifyContent: "center",
	                  },
	                ]}
	              >
	                <Image
	                  style={[
	                    {
	                      resizeMode: "contain",
	                      width: 30,
	                      height:30,
	                      alignSelf: "center",
	                    },
	                  ]}
	                  source={Iconsimg.icon_contact_confiance}
	                />
	              </TouchableOpacity>
	              <Text
	                style={{
	                  textAlign: "center",
	                  marginTop: 20,
	                  width: 80,
	                  color: "black",
	                }}
	              >
	                Contact de confiance
	              </Text>
	            </View>

	            <View>
	              <TouchableOpacity
	                onPress={() => onShare()}
	                style={[
	                  Generalstyle.shadow,
	                  {
	                    width: 50,
	                    overFlow: "hidden",
	                    height: 50,
	                    marginTop: 20,
	                    borderRadius: 100,
	                    alignSelf: "center",
	                    alignItems: "center",
	                    justifyContent: "center",
	                  },
	                ]}
	              >
	                <Image
	                  style={[
	                    {
	                      resizeMode: "contain",
	                      width: 30,
	                      height:30,
	                      alignSelf: "center",
	                    },
	                  ]}
	                  source={Iconsimg.icon_share_position}
	                />
	              </TouchableOpacity>
	              <Text
	                style={{
	                  textAlign: "center",
	                  marginTop: 20,
	                  width: 100,
	                  color: "black",
	                }}
	              >
	                Partager ma localisation
	              </Text>
	            </View>

	            <View>
	              <TouchableOpacity
	                onPress={() => setIsWarn(!IsWarn)}
	                style={[
	                  Generalstyle.shadow,
	                  {
	                    width: 50,
	                    overFlow: "hidden",
	                    height: 50,
	                    marginTop: 20,
	                    borderRadius: 100,
	                    alignSelf: "center",
	                    alignItems: "center",
	                    justifyContent: "center",
	                  },
	                ]}
	              >
	                <Image
	                  style={[
	                    {
	                      resizeMode: "contain",
	                      width: 30,
	                      height:30,
	                      alignSelf: "center",
	                    },
	                  ]}
	                  source={Iconsimg.icon_warn}
	                />
	              </TouchableOpacity>
	              <Text
	                style={{
	                  textAlign: "center",
	                  marginTop: 20,
	                  width: 100,
	                  color: "black",
	                }}
	              >
	                Numéro d'urgence
	              </Text>
	            </View>

	            
	          </View>
        </View>
      )}
      {userContact && (
        <View
	          style={[
	            {
	              position: "absolute",
	              height: "auto",
	              width: windowWidth / 1.04,
	              alignSelf: "center",
	              bottom: 25,
	              backgroundColor: "white",
	              borderRadius: 12,
	              padding: 20,
	            },
	          ]}
	        >
	        <TouchableOpacity onPress={() => setuserContact(!userContact)} >
	        <Icon name='arrow-left'size={25}style={[Colors.Dark]}
	                      /></TouchableOpacity>
	          <View
	            style={{ justifyContent: "space-between", flexDirection: "row" }}
	          >

	            <View style={{ justifyContent: "center", alignItems: "center" , alignContent:'center', flexDirection:'row'}}>
		            <TouchableOpacity
	                onPress={() => setIsCommand(!isCommand)}
	                style={[
	                  Generalstyle.shadow,
	                  {
	                    width: 50,
	                    overFlow: "hidden",
	                    height: 50,
	                    marginTop: 20,
	                    borderRadius: 100,
	                    alignSelf: "center",
	                    alignItems: "center",
	                    justifyContent: "center",
	                    backgroundColor:'#B0E9B3'
	                  },
	                ]}
	              >
	                <Image
	                  style={[
	                    {
	                      resizeMode: "contain",
	                      width: 30,
	                      height:30,
	                      alignSelf: "center",
	                    },
	                  ]}
	                  source={Iconsimg.icon_contact_confiance}
	                />
	              </TouchableOpacity>
	              <Text style={{alignSelf:'center',fontSize:20,color:'black',marginTop:10,marginLeft:10}}> Contact de confiance</Text>

	            </View>
	           
	          </View>
	          <View
	            style={{ }}
	          >
	          <Text/>
	          <Text style={[Generalstyle.shadow,{height:20,marginVertical:5,height:30,width:'auto',backgroundColor:'white',borderRadius:10,paddingTop:5,paddingLeft:5}]}>+225 {NumberPrivacy?.numberOne}</Text>
	          <Text style={[Generalstyle.shadow,{height:20,marginVertical:5,height:30,width:'auto',backgroundColor:'white',borderRadius:10,paddingTop:5,paddingLeft:5}]}>+225 {NumberPrivacy?.numberTwo}</Text>
	          <Text style={[Generalstyle.shadow,{height:20,marginVertical:5,height:30,width:'auto',backgroundColor:'white',borderRadius:10,paddingTop:5,paddingLeft:5}]}>+225 {NumberPrivacy?.numberThree}</Text>

	            
	          </View>
        </View>
      )}
      {IsWarn && (
        <View
	          style={[
	            {
	              position: "absolute",
	              height: "auto",
	              width: windowWidth / 1.04,
	              alignSelf: "center",
	              bottom: 25,
	              backgroundColor: "white",
	              borderRadius: 12,
	              padding: 20,
	            },
	          ]}
	        >
          <Text/>
	        <TouchableOpacity onPress={() => setIsWarn(!IsWarn)} >
	        <Icon name='arrow-left'size={25}style={[Colors.Dark]}/></TouchableOpacity>
          <Text/>
          <Text/>
	          <View
	            style={{ justifyContent: "space-between", flexDirection: "row" }}
	          >

	            <View style={{ justifyContent: "center", alignItems: "center" , alignContent:'center', flexDirection:'row',marginBottom:20}}>
		            <TouchableOpacity
	                onPress={() => setIsCommand(!isCommand)}
	                style={[
	                  Generalstyle.shadow,
	                  {
	                    width: 50,
	                    overFlow: "hidden",
	                    height: 50,
	                    marginTop: 20,
	                    borderRadius: 100,
	                    alignSelf: "center",
	                    alignItems: "center",
	                    justifyContent: "center",
	                    backgroundColor:'#B0E9B3'
	                  },
	                ]}
	              >
	                <Image
	                  style={[
	                    {
	                      resizeMode: "contain",
	                      width: 30,
	                      height:30,
	                      alignSelf: "center",
	                    },
	                  ]}
	                  source={Iconsimg.icon_warn}
	                />
	              </TouchableOpacity>
	              <Text style={{alignSelf:'center',fontSize:20,color:'black',marginTop:10,marginLeft:10}}>Numéro d'urgence</Text>

	            </View>
	           
	          </View>

	          <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
	          	<TouchableOpacity onPress={() => Linking.openURL(`tel:111`)} style={[Generalstyle.shadow,{width:'45%',justifyContent:'center',alignItems:'center',height:'70%',backgroundColor:'white',borderRadius:12}]}>
	          		<Text style={{fontSize:20,color:'black'}}>111</Text>
	          		<Text style={{color:"black"}}>Police Secours</Text>
	          	</TouchableOpacity>
	          	<TouchableOpacity onPress={() => Linking.openURL(`tel:201`)} style={[Generalstyle.shadow,{width:'45%',justifyContent:'center',alignItems:'center',height:'70%',backgroundColor:'white',borderRadius:12}]}>
	          		<Text style={{fontSize:20,color:'black'}}>201</Text>
	          		<Text style={{color:"black"}}>Sapeur pompier</Text>
	          	</TouchableOpacity>

	          </View>
	        <Text/>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default CourseStart;

