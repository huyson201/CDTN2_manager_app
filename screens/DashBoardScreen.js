import React, {useState, Component, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {WHITE, BLUE1, BLUE2, LIGHT_GRAY, DARK_GRAY} from '../src/values/color';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from '../api/userApi';
import {SIGNOUT_SUCCESSFULLY} from '../src/values/constants';
import {logout} from '../features/auth/userSlice';
import {resetToken} from '../src/utilFunc';
import staffApi from '../api/staffApi';
import {setSelectedHotel} from '../features/hotel/hotelSlice';
import {useToast} from 'react-native-toast-notifications';
const data = [
  {
    key: 'Phòng',
    image: require(`../src/images/living-room.png`),
  },

  {
    key: 'Dịch vụ',
    image: require(`../src/images/customer.png`),
  },
  {
    key: 'Nhân viên',
    image: require(`../src/images/team.png`),
  },
  {
    key: 'Hoá đơn',
    image: require(`../src/images/bill.png`),
  },
];
const data2 = [
  {
    key: 'Tài khoản',
    image: require(`../src/images/user.png`),
  },
  {
    key: 'Khách sạn',
    image: require(`../src/images/hotel.png`),
  },
  {
    key: 'Đăng xuất',
    image: require(`../src/images/logout.png`),
  },
];

const data3 = [
  {
    key: 'Tài khoản',
    image: require(`../src/images/user.png`),
  },
  {
    key: 'Quản lí users',
    image: require(`../src/images/team.png`),
  },
  {
    key: 'Đăng xuất',
    image: require(`../src/images/logout.png`),
  },
];
const data4 = [
  {
    key: 'Tài khoản',
    image: require(`../src/images/user.png`),
  },
  {
    key: 'Hoá đơn',
    image: require(`../src/images/bill.png`),
  },
  {
    key: 'Đăng xuất',
    image: require(`../src/images/logout.png`),
  },
];
const numColumns = 2;

const DashboardItem = props => {
  const {key, image} = props.dashboardItem;
  const dispatch = useDispatch();
  const toast = useToast();
  const handlePress = async () => {
    switch (key) {
      case 'Tài khoản':
        props.navigation.navigate('ProfileScreen');
        break;
      case 'Nhân viên':
        props.navigation.navigate('StaffList');
        break;
      case 'Hoá đơn':
        props.navigation.navigate('TabStatus');
        break;
      case 'Đăng xuất':
        try {
          const token = await AsyncStorage.getItem('token');
          await userApi.logout(token);
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('refresh_token');
          toast.show(SIGNOUT_SUCCESSFULLY, {
            type: 'success',
            placement: 'top',
            duration: 3000,
            offset: 0,
            animationType: 'slide-in',
          });
          dispatch(logout());
          // ToastAndroid.show(SIGNOUT_SUCCESSFULLY, ToastAndroid.SHORT);
        } catch (e) {
          console.log(e);
          const refresh = await AsyncStorage.getItem('refresh_token');
          resetToken(dispatch, refresh);
        }
        break;
      case 'Khách sạn':
        props.navigation.navigate('HotelList');
        break;
      case 'Quản lí users':
        props.navigation.navigate('UserList');
        break;
      case 'Phòng':
        props.navigation.navigate('AllRooms');
        break;
      default:
        break;
    }
  };
  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <Image style={styles.itemImage} source={image} />
      <View style={styles.border}></View>
      <Text style={styles.itemText}>{key}</Text>
    </TouchableOpacity>
  );
};

const DashBoardScreen = function ({navigation}) {
  const {selectedHotel} = useSelector(state => state.hotels);
  const {user} = useSelector(state => state.users);
  const dispatch = useDispatch();
  const getStaffByUserId = async () => {
    const res = await staffApi.getStaffByUserId(user.user_uuid);
    if (res.data.data.length > 0) {
      dispatch(setSelectedHotel(res.data.data[0].hotel_id));
    }
  };
  useEffect(() => {
    getStaffByUserId();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={
          user.user_role === 2
            ? data4
            : selectedHotel && user.user_role === 1
            ? data
            : !selectedHotel && user.user_role === 1
            ? data2
            : data3
        }
        renderItem={({item}) => (
          <DashboardItem dashboardItem={item} navigation={navigation} />
        )}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    marginLeft: 5,
    marginRight: 5,
  },
  item: {
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / numColumns,
    borderRadius: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 17,
    color: DARK_GRAY,
  },
});

export default DashBoardScreen;
