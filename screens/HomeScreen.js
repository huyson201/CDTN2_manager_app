import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import userApi from '../api/userApi';
import {logout} from '../features/auth/userSlice';
import {hotelSelectors, getHotelsOfUser} from '../features/hotel/hotelSlice';
import {SIGNOUT_SUCCESSFULLY} from '../src/values/constants';
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // const hotels = useSelector(hotelSelectors.selectAll);
  // const hotel = useSelector(state => hotelSelectors.selectById(state, 1));
  const {user, token} = useSelector(state => state.users);
 
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
    }
  };
  const handleInvoices = async () => {
    navigation.navigate('TabStatus');
  };
  const handleStaffList = async () => {
    navigation.navigate('StaffList');
  };
  useEffect(() => {
    dispatch(getHotelsOfUser({id: user.user_uuid, userToken: token}));
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>HomeScreen</Text>
      <Button onPress={handleLogout} title={'Logout'}></Button>
      <Button onPress={handleInvoices} title={'Invoices'}></Button>
      <Button onPress={handleStaffList} title={'Staffs'}></Button>
    </View>
  );
};

export default HomeScreen;
