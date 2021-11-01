import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {BLUE1} from '../src/values/color';
import {LOGO_TEXT} from '../src/values/constants';
const logo = require('../src/assets/logo.png');
const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image style={styles.img} source={logo} />
        <Text style={styles.text}>{LOGO_TEXT}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '70%',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    width: '100%',
    marginBottom: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    textTransform: 'capitalize',
    color: BLUE1,
    fontWeight: 'bold',
  },
});
export default SplashScreen;
