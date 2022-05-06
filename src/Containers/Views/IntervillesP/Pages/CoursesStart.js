/**
* Sample React Native CoursesStart
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

const CoursesStart: () => Node = ({navigation, route}) => {
const {DDetails,timestamp,u_data} = route.params;

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
        {Fr.IntV}
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
        {DDetails?.whereAreYou} - {DDetails?.whereAreYouGoing}
    </Text>
    <View style={{borderWidth:1,alignSelf:'center',width:'90%',borderRadius:20}}>
    <View style={{height: 50}} />
    <Text style={{fontWeight:'bold',textAlign:'center',fontSize:19,color:'black'}}>En route ...</Text>
    <View style={{height: 50}} />
    <Image
            source={Iconsimg.sys_img_ride1}
            style={[
            {
                width: '70%',
                resizeMode: 'contain',
                alignSelf:'center'
            },
            ]}
        />
        <View style={{height: 50}} />
    <Text style={{fontWeight:'bold',textAlign:'center',color:'black'}}>Faites bon voyage !!!</Text>


    <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginLeft: 5,
                marginRight: 5,
                paddingTop:30
              }}>
              <View>
              
              <TouchableOpacity style={[Generalstyle.shadow,{
                  width:50,
                  justifyContent:'center',
                  alignItems:'center',
                  width:80,
                  height:80,
                  borderRadius:windowHeight
              }]}>
              <Image
              source={Iconsimg.icon_contact_confiance}
              style={[
                {
                  resizeMode: 'contain',
                },
                Generalstyle.alignSelf,
              ]}
            />
              </TouchableOpacity>
                    <Text style={{textAlign:'center',fontSize:12,color:'black'}}>Contact de</Text>
                    <Text style={{textAlign:'center',fontSize:12,color:'black'}}>confiance</Text>
              </View>
              <View>
              <TouchableOpacity style={[Generalstyle.shadow,{
                  width:50,
                  justifyContent:'center',
                  alignItems:'center',
                  width:80,
                  height:80,
                  borderRadius:windowHeight
              }]}>
            <Image
              source={Iconsimg.icon_warn}
              style={[
                {
                  resizeMode: 'contain',
                },
                Generalstyle.alignSelf,
              ]}
            />
              

              </TouchableOpacity>
              <Text style={{textAlign:'center',fontSize:12,color:'black'}}>Numéros</Text>
                    <Text style={{textAlign:'center',fontSize:12,color:'black'}}>d'urgence</Text>
              </View>
            </View>
<View style={{height: 50}} />
    <View>
        <TouchableOpacity
        onPress={() => {
             var requestOptions = {
                  method:'PUT',
                  redirect:'follow'
                };

                fetch(`https://prumad.com/API/index2.php?CourseEndDrivers=${DDetails?.id}`,requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result)
                  navigation.navigate('CoursesEnd',{u_data:u_data,timestamp:new Date().getTime()});
                })
                .catch(error =>  console.log(error))
            }}
        style={[
            {
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderRadius: 30,
            width: '80%',
            alignSelf: 'center',
            },
            Colors.GreenLignt_BG,
        ]}>
        <Text style={{color:'white',fontWeight:'bold'}}>Je suis arrivé(e)</Text>
        </TouchableOpacity>



    </View>
<View style={{height: 50}} />

    </View>
    
    </ScrollView>
</View>
);
};

export default CoursesStart;
