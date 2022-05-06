/**
 * Sample React Native DetailSecurite
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

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';



//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';
import Header from '../Components/Header';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const DetailSecurite: () => Node = ({navigation, route}) => {


  const { action , u_dataV , timestamp,number} = route.params;

  const [ data , setData] = React.useState();
  const [ numberOne , setnumberOne] = React.useState(number?.numberOne);
  const [ numberTwo , setnumberTwo] = React.useState(number?.numberTwo);
  const [ numberThree , setnumberThree] = React.useState(number?.numberThree);


  //console.log(u_dataV)
  function savePrivacy(){
    var formdata = new FormData();
    formdata.append("numberOne", numberOne);
    formdata.append("numberTwo", numberTwo);
    formdata.append("numberThree",numberThree);
    formdata.append("uid", 1);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://prumad.com/API/index2.php?insertNumberPrivate", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        navigation.navigate('Securite',{u_dataV : u_dataV , timestamp: timestamp});
      })
      .catch(error => console.log('error', error));
  }

  
  //console.log(Colors.GreenLignt?.color) 
  return (
    <SafeAreaView style={{flex:1}}>
      <TouchableOpacity onPress={() => navigation.navigate('Securite',{u_dataV : u_dataV , timestamp: timestamp})} style={{margin:20}}>
              <Icon size={30} color={Colors.GreenLignt?.color} name="arrowleft" />
      </TouchableOpacity>
      {
      	action != "contactDC" ? 
      	<View style={[{margin:20}]}>
              <Text style={[Generalstyle.bold,{fontSize:20},Generalstyle.alignSelf,Colors.GreenLignt]}>Numéro d'urgence</Text>
              <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                
                <View>
                  <TouchableOpacity style={[Generalstyle.row,{justifyContent:'center',height:100,width:100,backgroundColor:'white',padding:10,borderRadius:100,marginBottom:30,marginTop:30},Generalstyle.shadow]}>
                      <Image source={Iconsimg.icon_warn} style={{alignSelf:'center',height:60,resizeMode:'contain'}}/>
                  </TouchableOpacity>
                  
                </View>

              </View>
              <View style={{alignSelf:'center',justifyContent:'space-evenly',flexDirection:'row'}}>
                	<View>
                		<TouchableOpacity style={[Generalstyle.shadow,{backgroundColor:'white',height:80,width:100,margin:20,borderRadius:20,justifyContent:'center',alignItems:'center'}]}>
                		<Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>111</Text>
                		</TouchableOpacity>
                							<Text style={{alignSelf:'center',width:50,textAlign:'center'}}>Police secours</Text>
                	</View>
                	<View>
                		<TouchableOpacity style={[Generalstyle.shadow,{backgroundColor:'white',height:80,width:100,margin:20,borderRadius:20,justifyContent:'center',alignItems:'center'}]}>
                		<Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>180</Text>
                		</TouchableOpacity>
  						<Text style={{alignSelf:'center',width:50,textAlign:'center'}}>Sapeur secours</Text>
                	</View>
              </View>
      </View> : 
      <View style={[{margin:20}]}>
              <Text style={[Generalstyle.bold,{fontSize:20},Generalstyle.alignSelf,Colors.GreenLignt]}>Contact de confiance</Text>
              <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                <View>
                  <TouchableOpacity style={[Generalstyle.row,{justifyContent:'center',height:100,width:100,backgroundColor:'white',padding:10,borderRadius:100,marginBottom:30,marginTop:30},Generalstyle.shadow]}>
                      <Image source={Iconsimg.icon_contact_confiance} style={{alignSelf:'center',height:60,resizeMode:'contain'}}/>
                  </TouchableOpacity>

                </View>
                
              </View>
            <View>
                	<View>
                  <TextInput value={numberOne} style={{height:50}} onChangeText={(val) => setnumberOne(val)} placeholder="Numero de confiance 1"/>
                	</View>
                	<View style={{borderBottomWidth:1,borderColor:'black'}}/>
                	<View>
                	<TextInput value={numberTwo} style={{height:50}} onChangeText={(val) => setnumberTwo(val)} placeholder="Numero de confiance 2"/>
                	</View>
                	<View style={{borderBottomWidth:1,borderColor:'black'}}/>

                	<View>
                	<TextInput value={numberThree} style={{height:50}} onChangeText={(val) => setnumberThree(val)} placeholder="Numero de confiance 3"/>
                	</View>
            </View>
            <Text/>
            <TouchableOpacity onPress={() => savePrivacy()} style={[{alignSelf:'center',height:50,width:'80%',justifyContent:'center',alignItems:'center',borderRadius:100,marginTop:20},Generalstyle.shadow,Colors.GreenLignt_BG]}>
            	<Text style={{color:'white',fontWeight:'bold'}}>Sauvegarder</Text>
            </TouchableOpacity>
      </View>
      }
      
    </SafeAreaView>
  );
};

export default DetailSecurite;
