 /**
 * Sample React Native Index
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
} from 'react-native';

//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../Components/context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End


/*
loading//
  useEffect(() => {
    setTimeout(() => {
  setIsLoading(false);
    },1000)
  },{})

*/

const Index: () => Node = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === '#3DB24B';
  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };
  const { u_dataV , timestamp } = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [MyAbonnment, setMyAbonnment] = React.useState();
  const [u_data, setdata] = React.useState(u_dataV);
  const [Amount, setAmount] = React.useState();



  const { signOut } = React.useContext(AuthContext);


  //Time
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  var hoursWork = `${hours}:${minutes}:${seconds}`;
  //End

  React.useEffect(() => {
    if(u_data?.u_data?.accountType == Fr.C){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://prumad.com/API/index2.php?myCurrentAmount=${u_data?.u_data?.id}`, requestOptions)
        .then(response => response.json())
        .then(result =>{ setAmount(result); console.log(result);})
        .catch(error => console.log('error', error));
     
  }

  },[timestamp])



  const btn = [
    {
      id: 1,
      routes: 'FindDrivers',
      firstView: 'FindDrivers',
      text: Fr.IntV,
      img: Iconsimg.icon_interville,
    },
    {
      id: 2,
      routes: 'AccueilCovoiturage',
      firstView: 'AccueilCovoiturage',
      text: Fr.Cov,
      img: Iconsimg.icon_covoiturage,
    },
    {
      id: 3,
      routes: 'FindDriversT',
      firstView: 'FindDriversT',
      text: Fr.Tav,
      img: Iconsimg.icon_travailleur,
    },
  ];

    const btn2= [
    {
      id: 1,
      routes: 'Courses',
      firstView: 'Courses',
      text: Fr.IntV,
      img: Iconsimg.icon_interville,
    },
    {
      id: 2,
      routes: 'AccueilCovoiturageP',
      firstView: 'AccueilCovoiturageP',
      text: Fr.Cov,
      img: Iconsimg.icon_covoiturage,
    },
    {
      id: 3,
      routes: 'CoursesT',
      firstView: 'CoursesT',
      text: Fr.Tav,
      img: Iconsimg.icon_travailleur,
    },
  ];
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'#3DB24B'} />
      <View style={[Generalstyle.miniCard]}>
        <Text
          style={[Generalstyle.miniText, Generalstyle.alignSelf, Colors.Green]}>
          {Fr.ChooseSys}
        </Text>
        <Text
        onPress={() => signOut()}
          style={[{fontSize:12}, Generalstyle.alignSelf, Colors.Green]}>
          Espace de {u_data?.u_data?.accountType}
        </Text> 
        
        {u_data?.u_data?.accountType == 'Conducteur' &&
          btn2.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[Generalstyle.miniCardBtn]}
                onPress={() => {
                      
                      if (item.text == 'Travailleurs') {
                        
                    
                      if (hours > 15 && hours < 23) {
                        navigation.navigate(`${item.firstView}`,{u_data: u_data?.u_data,timestamp: new Date().getTime(),Amount: Amount});
                      } else {
                        setModalVisible(!modalVisible);
                      }
                      if (hours > 4 && hours < 8) {
                        navigation.navigate(`${item.firstView}`,{u_data: u_data?.u_data,timestamp: new Date().getTime(),Amount: Amount});
                      } else {
                        setModalVisible(!modalVisible);
                      }
                      
                    }

                  if (item.text != 'Travailleurs') {
                    navigation.navigate(`${item.firstView}`,{u_data: u_data?.u_data,timestamp: new Date().getTime(),Amount: Amount});
                  }
                }}>
                <Image source={item.img} style={[Generalstyle.DefaultImg]} />
              </TouchableOpacity>
              <Text style={[Generalstyle.alignSelf, Generalstyle.bold,{color:'black'}]}>
                {item.text}
              </Text>
            </View>
          ))}

        {u_data?.u_data?.accountType == 'Passagers' &&
          btn.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[Generalstyle.miniCardBtn]}
                 onPress={() => {
                  if (item.text == 'Travailleurs') {
                      
                  
                    if (hours > 15 && hours < 23) {
                      navigation.navigate(`${item.firstView}`,{u_data: u_data?.u_data,timestamp: new Date().getTime(),Amount: Amount});
                    } else {
                      setModalVisible(!modalVisible);
                    }
                    if (hours > 3 && hours < 8) {
                      navigation.navigate(`${item.firstView}`,{u_data: u_data?.u_data,timestamp: new Date().getTime(),Amount: Amount});
                    } else {
                      setModalVisible(!modalVisible);
                    }
                    
                  }
                  if (item.text != 'Travailleurs') {
                    navigation.navigate(`${item.firstView}`,{u_data: u_data?.u_data,timestamp: new Date().getTime(),Amount: Amount});
                  }
                }}>
                <Image source={item.img} style={[Generalstyle.DefaultImg]} />
              </TouchableOpacity>
              <Text style={[Generalstyle.alignSelf, Generalstyle.bold,{color:'black'}]}>
                {item.text}
              </Text>
            </View>
          ))}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={Generalstyle.centeredView}>
          <View style={Generalstyle.modalView}>
            <Image
              source={Iconsimg.icon_travailleur}
              style={[
                Generalstyle.DefaultImg,
                {resizeMode: 'contain', width: 100},
              ]}
            />
            <Text
              style={[Generalstyle.modalText, Generalstyle.bold, Colors.red]}>
              {Fr.warnTextIntV}
            </Text>
            <Text style={[Generalstyle.modalText, Colors.red]}>{Fr.Mn}</Text>
            <Text
              style={[Generalstyle.modalText, Generalstyle.bold, Colors.red]}>
              05h à 08h
            </Text>
            <Text style={[Generalstyle.modalText, Colors.red]}>{Fr.Sr}</Text>
            <Text
              style={[Generalstyle.modalText, Generalstyle.bold, Colors.red]}>
              16h à 20h
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default Index;
