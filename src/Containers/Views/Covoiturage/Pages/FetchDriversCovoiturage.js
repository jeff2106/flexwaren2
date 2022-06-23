/**
 * Sample React Native FetchDriversCovoiturage
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
  Linking,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";


import Icons from "react-native-vector-icons/AntDesign";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
  Alert
} from "react-native-reanimated";
import Geolocation from "@react-native-community/geolocation";
import Pusher from 'pusher-js/react-native';

//My Src Import
import Colors from "../../../Utils/Colors.js";
import Iconsimg from "../../../Utils/Img";
import Fr from "../../../Utils/Fr";
import Generalstyle from "../../../Utils/GeneralStyle";
import HeaderCov from "../../../Components/headerCov";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


//End

  const ASPECT_RATIO = windowWidth / windowHeight;
  const latitudeDelta= 0.000864195044303443;
  const  longitudeDelta = latitudeDelta * ASPECT_RATIO;

const FetchDriversCovoiturage: () => Node = ({ navigation, route }) => {
  const { curentPositionNext, u_data,timestamp,courseDetails } = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [alwaysAvailable, setAlwaysAvailable] = React.useState(1);
  const [notification, setNotification] = React.useState(false);
  const [isCommand, setIsCommand] = React.useState(true);
  const [Kilometers, setKilometers] = React.useState();
  const [Hourse, setHourse] = React.useState();

  const [isDriverLicence, setisDriverLicence] = React.useState(false);
  const [Det, setDet] = React.useState({  latitude: parseFloat(courseDetails?.whereYouAreLat), longitude: parseFloat(courseDetails?.whereYouAreLng)  });

  const initialState = {
     latitude: 0,
     longitude: 0,
     latitudeDelta: 0.120864195044303443,
     longitudeDelta: 0.1220142817690068,
   };
  const [curentPosition, setCurentPosition] = React.useState(initialState);

  const destination = { latitude: Det.latitude , longitude: Det.longitude };


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

//GET DetailsCourse
 React.useEffect(() => {
      const interval = setInterval(() => {
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

      }, 10000);
      return () => clearInterval(interval);


  },[Det.latitude]);


  Pusher.logToConsole = false;

  var pusher = new Pusher('e4ad133537d71dc9e689', {
    cluster: 'mt1'
  });

  var channel = pusher.subscribe('Covoiturage');
  channel.bind('raceCancel', function(data) {

  if(data?.PassagerID == u_data?.id){

      console.log(data);
     navigation.navigate("AccueilCovoiturage",{u_data:u_data,timestamp:timestamp});

    }

});

channel.bind('GoRideNow', function(data) {

  if(data?.idRace == courseDetails?.id){

      console.log(data);
     navigation.navigate("CourseStart",{curentPositionNext:curentPositionNext, u_data:u_data,timestamp:new Date().getTime(),courseDetails:courseDetails });

    }

});

//console.log(Det.longitude);
if(Det.latitude == null){
 return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
      )
}else{

  /* === Notifications ====*/
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[{ position: "absolute", top: 10, zIndex: 4 }]}
        onPress={() => navigation.openDrawer()}
      >
        <Icon name='menu' size={30} style={[Colors.Dark]} />
      </TouchableOpacity>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType='standard'
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
          origin={{ latitude: curentPosition?.latitude , longitude: curentPosition?.longitude }}
          destination={destination}
          apikey={"AIzaSyDSbg654fWaJihkk3FIk52Je8viclmsYCU"}
          onReady={result => {
            const number = result.duration.toString()
            const distance = result.distance.toString()
            setHourse(number.split('.')[0])
            setKilometers(distance)
          }}
        />
        <MapView.Marker
          coordinate={Det}
        >
          <Image
            style={{
              height:70,
              width:70,
              resizeMode: "contain",
              transform: [{ rotate:"120deg"}],
            }}
            source={Iconsimg.Car_flex_waren}

          />
        </MapView.Marker>

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
                Arrive dans ~ {Hourse} min
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
                      height:50,
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
                  fontWeight:'bold'
                }}
              >
                {courseDetails?.driverData?.fullName}
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
                <Foundation name='telephone' size={20} style={[Colors.Dark]} />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  width: 100,
                  color: "black",
                }}
              >
                Contacter le conducteur
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {

              var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
              };

              fetch(`https://prumad.com/API/index2.php?CancelRide=${u_data?.id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result);
                  setIsCommand(!isCommand);
                  navigation.navigate('AccueilCovoiturage',{u_data: u_data,timestamp: timestamp});
                })
                .catch(error => console.log('error', error));


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
                <Icons name='close' size={20} style={[Colors.red]} />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  width: 100,
                  color: "black",
                }}
              >
                Annuler la commande
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
                      <Text style={{color:"black"}}>{courseDetails?.driverData?.rate}</Text>
                      <Text style={{color:"black"}}>Evaluations</Text>
                    </View>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text></Text>
                      <Text></Text>
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
    </View>
  );
  }
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
export default FetchDriversCovoiturage;

