import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import userApi from '../api/userApi';
import {logout} from '../features/auth/userSlice';
import {hotelSelectors, getHotelsOfUser} from '../features/hotel/hotelSlice';
import { resetToken } from '../src/utilFunc';
import {SIGNOUT_SUCCESSFULLY} from '../src/values/constants';
const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // const hotels = useSelector(hotelSelectors.selectAll);
  // const hotel = useSelector(state => hotelSelectors.selectById(state, 1));
 
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await userApi.logout(token);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refresh_token');
      dispatch(logout());
      ToastAndroid.show(SIGNOUT_SUCCESSFULLY, ToastAndroid.SHORT);
    } catch (e) {
      console.log(e);
      const refresh = await AsyncStorage.getItem('refresh_token');
      resetToken(dispatch,refresh)
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button onPress={handleLogout} title={'Logout'}></Button>
    </View>
  );
};

export default ProfileScreen;
