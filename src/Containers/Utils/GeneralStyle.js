import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, Image, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Generalstyle = StyleSheet.create({
  Center_body: {
    flex: 1,
    justifyContent: 'center',
  },
  JSC_ALI_C: {
    justifyContent: 'center',
    alignItems:'center'
  },
  JSC_SPACE_EVENLY_ALI_C: {
    justifyContent: 'space-evenly',
    alignItems:'center'
  },
  FLEX_D_ROW: {
    flexDirection:'row'
  },
  miniCard: {
    backgroundColor: 'white',
    height: windowHeight / 1.2,
    marginTop: windowHeight / 15,
    width: windowWidth / 1.1,
    borderRadius: 12,
    alignSelf: 'center',
    alignContent: 'center',
    padding: 20,
  },
  miniCardBtn: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    backgroundColor: '#F4EDED',
    elevation: 7,
    width: windowWidth / 4,
    height: windowHeight / 8,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    backgroundColor: '#F4EDED',
    elevation: 3,
  },
  miniText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 23,
    width: 160,
    textAlign: 'center',
  },
  DefaultImg: {
    resizeMode: 'contain',
    width: '70%',
  },
  //After Choose sys Card
  alignSelf: {
    alignSelf: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },

  //FindDriver
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  //ModalStyle
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.4);',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  ring: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "tomato",
    borderWidth: 10,
  }
  //End
  ,textAlign_center: {
    textAlign:'center'
  },
  textAlign_left: {
    textAlign:'left'
  }
  ,textAlign_right: {
    textAlign:'right'
  },

  //SIZE
  SIZE_10: {
    fontSize: 10
  }
  ,
  SIZE_12: {
    fontSize: 12
  }
  ,
  SIZE_15: {
    fontSize: 15
  },
  SIZE_17: {
    fontSize: 17
  },
  SIZE_20: {
    fontSize: 20
  }
  ,
  SIZE_25: {
    fontSize: 25
  }
  ,
  SIZE_30: {
    fontSize: 30
  }
  ,
  SIZE_35: {
    fontSize: 35
  }
  ,
  SIZE_22: {
    fontSize: 22
  }
  ,
  SIZE_32: {
    fontSize: 32
  },
  WIDTH_10: {
    width: '10%'
  },
  WIDTH_15: {
    width: '15%'
  },
  WIDTH_20: {
    width: '20%'
  },
  WIDTH_25: {
    width: '25%'
  },
  WIDTH_30: {
    width: '35%'
  },
  WIDTH_40: {
    width: '40%'
  },
  WIDTH_45: {
    width: '45%'
  },
  WIDTH_50: {
    width: '50%'
  },
  WIDTH_55: {
    width: '55%'
  },
  WIDTH_60: {
    width: '60%'
  },
  WIDTH_65: {
    width: '65%'
  },
  WIDTH_70: {
    width: '70%'
  },
  WIDTH_75: {
    width: '75%'
  },
  WIDTH_80: {
    width: '80%'
  },
  WIDTH_85: {
    width: '85%'
  },
  WIDTH_90: {
    width: '90%'
  },
  WIDTH_95: {
    width: '95%'
  },
  WIDTH_100: {
    width: '100%'
  },
  HEIGHT_10: {
    height: '10%'
  },
  HEIGHT_15: {
    height: '15%'
  },
  HEIGHT_20: {
    height: '20%'
  },
  HEIGHT_25: {
    height: '25%'
  },
  HEIGHT_30: {
    height: '35%'
  },
  HEIGHT_40: {
    height: '40%'
  },
  HEIGHT_45: {
    height: '45%'
  },
  HEIGHT_50: {
    height: '50%'
  },
  HEIGHT_55: {
    height: '55%'
  },
  HEIGHT_60: {
    height: '60%'
  },
  HEIGHT_65: {
    height: '65%'
  },
  HEIGHT_70: {
    height: '70%'
  },
  HEIGHT_75: {
    height: '75%'
  },
  HEIGHT_80: {
    height: '80%'
  },
  HEIGHT_85: {
    height: '85%'
  },
  HEIGHT_90: {
    height: '90%'
  },
  HEIGHT_95: {
    height: '95%'
  },
  HEIGHT_100: {
    height: '100%'
  },



});
export default Generalstyle;
