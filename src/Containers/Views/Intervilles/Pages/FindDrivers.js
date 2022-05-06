/**
 * Sample React Native FindDrivers
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
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Octicons';
import {Picker} from '@react-native-picker/picker';
//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';
import Header from '../../../Components/Header';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const FindDrivers: () => Node = ({navigation, route}) => {

  const { u_data , timestamp } = route.params;
  const backgroundStyle = {
      backgroundColor: '#3DB24B',
      width: windowWidth,
      height: windowHeight,
    };
  const [modalVisible, setModalVisible] = React.useState(false);
  const [SearchTxT, setSearchTxT] = React.useState('');
  const [SearchTxTAV, setSearchTxTAV] = React.useState('');
  const [selectedLanguage, setSelectedLanguage] = React.useState('');

  if(selectedLanguage != ''){
    navigation.navigate('ResultDrivers', {WAY: selectedLanguage, u_data: u_data,WAYG:'', timestamp: new Date().getTime()})
    setSelectedLanguage('');
  }
  const freQV = [];
  return (
    <SafeAreaView>
      
      <View>
        <Header  />
        <View
          style={[
            backgroundStyle,
            {
              height: windowHeight,
              borderBottomRadius: 12,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              padding: 10,
            },
          ]}>
          <Text
            style={[
              Generalstyle.bold,
              Colors.White,
              {
                fontSize: 20,
              },
            ]}>
            Où êtes-vous ?
          </Text>
          <View
            style={[
              Generalstyle.row,
              Colors.White_BG,
              {
                borderRadius: 10,
                marginTop: 10,
                padding: 5,
              },
            ]}>
            <Picker
             style={[{marginLeft: 10, height: '100%', width: '100%',color:'black'}]}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Choisissez la ville" value={selectedLanguage} />
              <Picker.Item label="Abidjan" value="Abidjan" />
            </Picker>
          </View>
          
          
        </View>
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
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default FindDrivers;
