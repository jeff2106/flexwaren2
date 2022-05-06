/**
 * Sample React Native Header
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';


//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const Header: () => Node = (props) => {
  const isDarkMode = useColorScheme() === '#3DB24B';
  const navigation = useNavigation();


  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };

  return (
    <SafeAreaView>
      <View style={[Colors.darkGreen_BG, {height: windowHeight / 6}]}>
        <View style={[Generalstyle.row, {margin: 10}]}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}> 
            <Icon name="menu" size={30} style={[Colors.White]} />
          </TouchableOpacity>
          { props.title == "Travailleurs" && <Text
            style={[
              Colors.White,
              {marginLeft: windowHeight / 6.2, fontSize: 20},
              Generalstyle.bold,
            ]}>
           Travailleurs
          </Text>}
          { props.title == "Cov" && <Text
            style={[
              Colors.White,
              {marginLeft: windowHeight / 6.2, fontSize: 20},
              Generalstyle.bold,
            ]}>
           Covoiturage
          </Text>}
          { props.title != "Travailleurs"  &&  props.title != "Cov" &&
          <Text
            style={[
              Colors.White,
              {marginLeft: windowHeight / 6.2, fontSize: 20},
              Generalstyle.bold,
            ]}>
            {Fr.IntV} 
          </Text>}
          
        </View>
        { props.title == "Travailleurs" && <Image
          source={Iconsimg.icon_travailleur}
          style={[Generalstyle.DefaultImg, Generalstyle.alignSelf,{height:50}]}
        />}
          { props.title != "Travailleurs" && props.title != "Cov" &&
           <Image
          source={Iconsimg.icon_interville}
          style={[Generalstyle.DefaultImg, Generalstyle.alignSelf]}
        />}

        { props.title == "Cov" && <Image
          source={Iconsimg.icon_covoiturage}
          style={[Generalstyle.DefaultImg, Generalstyle.alignSelf,{width:40,height:40}]}
        />}
        
      </View>
    </SafeAreaView>
  );
};

export default Header;
