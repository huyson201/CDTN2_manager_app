import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from 'react-native-elements';
import {BLUE1} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../src/values/size';
import {LOGIN_SUCCESSFULLY} from '../src/values/constants';
import userApi from '../api/userApi';
import {useDispatch} from 'react-redux';
import {login} from '../features/auth/userSlice';
const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const emailInput = useRef();
  const passInput = useRef();
  const [data, setData] = useState({
    checkTextInputChange: false,
    secureTextEntry: true,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const _isMouted = useRef(true);
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  useEffect(() => {
    return () => {
      _isMouted.current = false;
    };
  }, []);
  const handleLogin = async () => {
    setisLoading(true);
    try {
      const res = await userApi.login(email, password);
      if (!res.data.msg) {
        dispatch(login(res.data.data.user));
        await AsyncStorage.setItem('token', res.data.data.token);
        await AsyncStorage.setItem('refresh_token', res.data.data.refreshToken);
        if (_isMouted.current) {
          setisLoading(false);
        }
        ToastAndroid.show(LOGIN_SUCCESSFULLY, ToastAndroid.SHORT);
      } else {
        setisLoading(false);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={loginStyles.wrapper}>
        <View style={loginStyles.container}>
          <View style={loginStyles.header}>
            <ImageBackground
              style={loginStyles.img}
              source={require('../src/assets/logo.png')}></ImageBackground>
            <Text style={loginStyles.textLogo}>THE BOOKING</Text>
          </View>
          <View style={loginStyles.inner}>
            <Text style={loginStyles.text_footer}>Email</Text>
            <View style={loginStyles.action}>
              <Icon
                style={loginStyles.icon}
                name="user-alt"
                size={18}
                backgroundColor="#05375a"
                color="#05375a"></Icon>
              <TextInput
                ref={emailInput}
                placeholder="Your Email"
                autoCapitalize="none"
                defaultValue={email}
                onChangeText={val => setEmail(val)}
                style={loginStyles.textInput}></TextInput>
              {/* {data.checkTextInputChange ? (
              <Icon
                style={loginStyles.icon}
                name="check"
                size={18}
                color="#05375a"></Icon>
            ) : null} */}
            </View>
            <Text style={loginStyles.text_footer}>Password</Text>
            <View style={loginStyles.action}>
              <Icon
                style={loginStyles.icon}
                name="key"
                size={18}
                color="#05375a"></Icon>
              <TextInput
                ref={passInput}
                placeholder="Your Password"
                secureTextEntry={data.secureTextEntry ? true : false}
                autoCapitalize="none"
                style={loginStyles.textInput}
                defaultValue={password}
                onChangeText={val => setPassword(val)}></TextInput>
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Icon
                    style={loginStyles.icon}
                    name="eye-slash"
                    size={18}
                    color="#05375a"></Icon>
                ) : (
                  <Icon
                    style={loginStyles.icon}
                    name="eye"
                    size={18}
                    color="#05375a"></Icon>
                )}
              </TouchableOpacity>
            </View>
            <Button
              title={'LOGIN'}
              buttonStyle={loginStyles.buttonStyle}
              onPress={handleLogin}
              loading={isLoading}></Button>
          </View>
          <View style={loginStyles.footer}></View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const loginStyles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: BLUE1,
    borderRadius: 10,
    marginTop: 20,
    fontWeight: 'bold',
  },
  wrapper: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    backgroundColor: BLUE1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textLogo: {
    marginTop: 10,
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inner: {
    flex: 1,
    elevation: 2,
    shadowColor: '#000',
    borderRadius: 20,
    backgroundColor: '#FFF',
    paddingVertical: 50,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: -30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  icon: {
    paddingTop: 13,
  },
  footer: {
    flex: 0.3,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 50,
    paddingHorizontal: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: '#05375a',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 15,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  img: {
    height: DEVICE_HEIGHT / 4,
    width: DEVICE_HEIGHT / 4,
  },
});
export default LoginScreen;
