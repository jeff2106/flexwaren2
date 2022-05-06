/**
 * Sample React Native Footer
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

//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const Footer: () => Node = ({navigation}) => {
  const isDarkMode = useColorScheme() === '#3DB24B';

  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };

  return (
    <SafeAreaView>
      <View
        style={[
          Colors.darkGreen_BG,
          {
            height: windowHeight / 9,
            justifyContent: 'space-around',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },

          Generalstyle.row,
        ]}>
        <TouchableOpacity
          style={[
            Colors.GreenLignt_BG,
            {
              width: '40%',
              justifyContent: 'center',
              borderRadius: 10,
              height: 40,
            },
            Generalstyle.row,
          ]}>
          <Text style={{color: 'white'}}>{Fr.CreateWarn}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Colors.GreenLignt_BG,
            {
              width: '40%',
              justifyContent: 'center',
              borderRadius: 10,
              height: 40,
            },
            Generalstyle.row,
          ]}>
          <Text style={{color: 'white'}}>{Fr.MyWarn}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Footer;
