 /**
 * Sample React Native LastViewInsertUser
 * https://github.com/facebo{Fr.VV}/react-native
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';
import { AuthContext } from '../Components/context';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const LastViewInsertUser: () => Node = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === '#3DB24B';
  const {u_data, typeC} = route.params;

  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };

  const { signIn, signUp,signOut } = React.useContext(AuthContext);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [count, setcount] = React.useState(120);

  return (
    <View style={[{height: windowHeight, flex: 1}]}>
      <View
        style={[
          Colors.GreenLignt_BG,
          {
            height: windowHeight / 10,
            alignItems: 'center',
            padding: 10,
            flexDirection: 'row',
          },
        ]}>
        <TouchableOpacity>
        </TouchableOpacity>
        <Text
          style={[
            {
              color: 'white',
              fontSize: 20,
              marginLeft: 20,
              fontWeight: 'bold',
              textAlign:'center'
            },
          ]}>
          {Fr.TIS}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
        }}>
        <Image
          source={{uri: `data:image/jpeg;base64,${u_data?.u_data?.photoProfil}`}}
          style={[
            {
              resizeMode: 'contain',
              width: windowWidth / 2,
              height: windowHeight / 2.7,
              borderRadius: 200,
            },
          ]}
        />
        <Text style={[{fontSize: 20, marginTop: 20, color: '#3DB24B'}]}>
          {u_data?.fullName}
        </Text>
        <Image
          source={Iconsimg.sys_img_trophee}
          style={[
            {
              resizeMode: 'contain',
              width: windowWidth / 2,
              marginTop: 10,
            },
          ]}
        />
        <Text style={[{fontSize: 20, marginTop: 20, color: '#3DB24B'}]}>
          {Fr.good}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          signUp(u_data,"password")
          /*
          navigation.navigate('Index', {
            u_data: u_data,
            typeC: typeC
          })
        */
        }
        style={[
          {
            height: 40,
            position: 'absolute',
            bottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderRadius: 40,
            width: windowWidth / 1.2,
            alignSelf: 'center',
            backgroundColor: '#3DB24B',
          },
        ]}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{Fr.start}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LastViewInsertUser;
