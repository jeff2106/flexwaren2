/**
 * Sample React Native FirstView
 * https://github.com/facebo{Fr.VV}/react-native
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
   Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

//My Src Import
import Colors from "../Utils/Colors.js";
import Iconsimg from "../Utils/Img";
import Fr from "../Utils/Fr";
import Generalstyle from "../Utils/GeneralStyle";

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//End

const FirstView: () => Node = ({ navigation, route }) => {
   

   const [modalVisible, setModalVisible] = React.useState(false);
   const [fullName, setfullName] = React.useState("");
   const [email, setemail] = React.useState("");
   const [password, setpassword] = React.useState("");
   const [birthDay, setbirthDay] = React.useState();
   const [ville, setville] = React.useState("");
   const [region, setregion] = React.useState("");

   return (
      <View style={[{ height: windowHeight, flex: 1 }]}>
         <ScrollView style={[{ height: windowHeight }]}>
            <View
               style={[
                  Colors.GreenLignt_BG,
                  {
                     height: windowHeight / 10,
                     alignItems: "center",
                     padding: 10,
                     flexDirection: "row",
                  },
               ]}
            >
               <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                     name="arrow-back"
                     size={35}
                     style={[{ color: "white" }]}
                  />
               </TouchableOpacity>
               <Text
                  style={[
                     {
                        color: "white",
                        fontSize: 20,
                        marginLeft: 20,
                        fontWeight: "bold",
                        paddingLeft: 10,
                     },
                  ]}
               >
                  {Fr.Cra}
               </Text>
            </View>
            <Text
               style={{
                  alignSelf: "center",
                  color: "#3DB24B",
                  marginTop: 20,
                  marginBottom: 20,
               }}
            >
               {Fr.NI}
            </Text>
            <View style={{ margin: 5 }}>
               <Text
                  style={{ marginLeft: 10, color: "#3DB24B", marginBottom: 20 }}
               >
                  {Fr.Nm}
               </Text>
               <TextInput
                  onChangeText={(val) => setfullName(val)}
                  style={[
                     {
                        alignSelf: "center",
                        backgroundColor: "white",
                        color:'black',
                        borderRadius: 20,
                        fontSize: 15,
                        width: windowWidth / 1.1,
                        height:50,
                        fontWeight: "bold",
                        paddingLeft: 10,
                     },
                  ]}
               />
            </View>
            <View style={{ margin: 5 }}>
               <Text
                  style={{ marginLeft: 10, color: "#3DB24B", marginBottom: 20 }}
               >
                  {Fr.EM}
               </Text>
               <TextInput
                  onChangeText={(val) => setemail(val)}
                  style={[
                     {
                        alignSelf: "center",
                        color:'black',
                        backgroundColor: "white",
                        borderRadius: 20,
                        fontSize: 15,
                        width: windowWidth / 1.1,
                        height:50,
                        fontWeight: "bold",
                        paddingLeft: 10,
                     },
                  ]}
               />
            </View>

            <View style={{ margin: 5 }}>
               <Text
                  style={{ marginLeft: 10, color: "#3DB24B", marginBottom: 20 }}
               >
                  {Fr.MM}
               </Text>
               <TextInput
                  onChangeText={(val) => setpassword(val)}
                  secureTextEntry
                  style={[
                     {
                        alignSelf: "center",
                        backgroundColor: "white",
                        borderRadius: 20,
                        color:'black',
                        fontSize: 15,
                        width: windowWidth / 1.1,
                        height:50,
                        fontWeight: "bold",
                        paddingLeft: 10,
                     },
                  ]}
               />
            </View>
            <Text
               style={{
                  alignSelf: "center",
                  color: "#3DB24B",
                  marginTop: 20,
                  marginBottom: 20,
               }}
            >
               {Fr.IP}
            </Text>
            
            <View style={{ margin: 5 }}>
               <Text
                  style={{ marginLeft: 10, color: "#3DB24B", marginBottom: 20 }}
               >
                  {Fr.RG}
               </Text>
               <TextInput
                  onChangeText={(val) => setregion(val)}
                  style={[
                     {
                        alignSelf: "center",
                        backgroundColor: "white",
                        borderRadius: 20, 
                        color:'black',
                        fontSize: 15,
                        width: windowWidth / 1.1,
                        height:50,
                        fontWeight: "bold",
                        paddingLeft: 10,
                     },
                  ]}
               />
            </View>
            <View style={{ margin: 5 }}>
               <Text
                  style={{ marginLeft: 10, color: "#3DB24B", marginBottom: 20 }}
               >
                  {Fr.VV}
               </Text>
               <TextInput
                  onChangeText={(val) => setville(val)}
                  style={[
                     {
                        alignSelf: "center",
                        backgroundColor: "white",
                        borderRadius: 20, 
                        color:'black',
                        fontSize: 15,
                        width: windowWidth / 1.1,
                        height:50,
                        fontWeight: "bold",
                        paddingLeft: 10,
                     },
                  ]}
               />
            </View>
            <View style={{ height: 10 }} />
            <View style={{ height: 10 }} />

            <View>
               {fullName == "" ||
               email == "" ||
               password == "" ||
               region == "" ||
               ville == "" ? (
                  <TouchableOpacity
                     onPress={() =>
                       Alert.alert('Alert', 'vous devez remplir tous les champs !!!')
                     }
                     style={[
                        {
                           height: 50,
                           justifyContent: "center",
                           alignItems: "center",
                           marginBottom: 10,
                           borderRadius: 40,
                           width: "90%",
                           alignSelf: "center",
                        },
                        Colors.Gray_BG,
                     ]}
                  >
                     <Text style={{ color: "white" }}>SUIVANT</Text>
                  </TouchableOpacity>
               ) : (
                  <TouchableOpacity
                     onPress={() =>
                        navigation.navigate("NmberVerif1", {
                           data: [
                              fullName,
                              email,
                              password,
                              birthDay ?? "nean",
                              region,
                              ville,
                           ],
                        })
                     }
                     style={[
                        {
                           height: 50,
                           justifyContent: "center",
                           alignItems: "center",
                           marginBottom: 10,
                           borderRadius: 40,
                           width: "90%",
                           alignSelf: "center",
                        },
                        Colors.GreenLignt_BG,
                     ]}
                  >
                     <Text style={{ color: "white" }}>SUIVANT</Text>
                  </TouchableOpacity>
               )}
            </View>
         </ScrollView>
      </View>
   );
};

export default FirstView;
