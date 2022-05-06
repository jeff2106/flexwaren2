/**
* Sample React Native CoursesEndT
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

//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const CoursesEndT: () => Node = ({navigation, route}) => {
const isDarkMode = useColorScheme() === '#3DB24B';

const backgroundStyle = {
backgroundColor: '#3DB24B',
width: windowWidth,
height: windowHeight,
};
const [modalVisible, setModalVisible] = React.useState(false);

return (
<View style={[{height: windowHeight, flex: 1}]}>
    <ScrollView style={[{height: windowHeight}]}>
    <View
        style={[
        Colors.darkGreen_BG,
        {
            height: windowHeight / 10,
            alignItems: 'center',
            justifyContent:'center'
        },
        ]}>
        <Text
        style={[
            {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            paddingLeft: 10,
            },
        ]}>
        {Fr.Tav}
        </Text>
    </View>
    <Text
        style={{
        color: '#3DB24B',
        marginTop: 20,
        marginBottom: 20,
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center'
        }}>
        Abidjan - Yamoussoukro
    </Text>
    <View style={{borderWidth:1,alignSelf:'center',width:'90%',borderRadius:20}}>
    <View style={{height: 50}} />
    <Text style={{fontWeight:'bold',textAlign:'center',fontSize:19}}>VOYAGE TERMINÉ</Text>
    <Text style={{fontWeight:'bold',textAlign:'center',fontSize:19}}>Vous êtes arrivé(e)</Text>

    <View style={{height: 50}} />
    <Image
            source={Iconsimg.sys_img_flags}
            style={[
            {
                width: '70%',
                resizeMode: 'contain',
                alignSelf:'center'
            },
            ]}
        />
<View style={{height: 50}} />
    <View>
        <TouchableOpacity
        onPress={() => navigation.navigate('CoursesT')}
        style={[
            {
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderRadius: 10,
            width: '80%',
            alignSelf: 'center',
            },
            Colors.darkGreen_BG,
        ]}>
        <Text style={{color:'white',fontWeight:'bold'}}>Fermer</Text>
        </TouchableOpacity>
    </View>
<View style={{height: 50}} />

    </View>
    
    </ScrollView>
</View>
);
};

export default CoursesEndT;
