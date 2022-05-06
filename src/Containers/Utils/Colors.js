import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, Image, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Colors = StyleSheet.create({
  White: {
    color: 'white',
  },
  Dark: {
    color: '#000000',
  },
  GreenLignt: {
    color: '#3DB24B',
  },
  Green: {
    color: '#1E8723',
  },
  Gray: {
    color: '#989898',
  },
  Gray_light: {
    color: '#00000029',
  },
  red: {
    color: 'red',
  },
  BG_red: {
    backgroundColor: 'red',
  },
  blue: {
    color: '#347CC5',
  },
  darkGreen: {
    color: '#053706',
  },
  White_BG: {
    backgroundColor: '#FFFFFF',
  },
  Dark_BG: {
    backgroundColor: '#000000',
  },
  GreenLignt_BG: {
    backgroundColor: '#3DB24B',
  },
  Green_BG: {
    backgroundColor: '#053706',
  },
  Gray_BG: {
    backgroundColor: '#989898',
  },
  Gray_light_BG: {
    backgroundColor: '#00000029',
  },
  red_BG: {
    backgroundColor: '#FF0000',
  },
  blue_BG: {
    backgroundColor: '#347CC5',
  },
  darkGreen_BG: {
    backgroundColor: '#053706',
  },
});
export default Colors;
