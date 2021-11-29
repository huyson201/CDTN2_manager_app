import {useIsFocused} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HotelItem} from '../components/hotel/HotelItem';
import {
  deleteHotelSlice,
  getHotelsOfUser,
  hotelSelectors,
  removeSelectedHotel,
} from '../features/hotel/hotelSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {SwipeListView} from 'react-native-swipe-list-view';
import {BLUE2, WHITE} from '../src/values/color';
import hotelApi from '../api/hotelApi';
const HotelList = ({navigation}) => {
  const isFocused = useIsFocused();
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.users);
  const {loading} = useSelector(state => state.hotels);
  const hotels = useSelector(hotelSelectors.selectAll);
  const getHotels = () => {
    dispatch(getHotelsOfUser({id: user.user_uuid, userToken: token}));
  }
  
  useEffect(() => {
    getHotels()
    return setCheck(false);
  }, [isFocused, check]);
  useEffect(() => {
    if (isFocused) {
      dispatch(removeSelectedHotel());
    }
  }, [isFocused]);
  const handlePressAdd = () => {
    navigation.navigate('AddHotel');
  };
  const deleteHotel = async ({id}) => {
    try {
      await hotelApi.delete(id, token);
      // dispatch(deleteHotelSlice({id: id, token: token}));
      setCheck(true);
      ToastAndroid.show('DELETE SUCCESSFULLY', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <SwipeListView
        refreshing={loading}
        onRefresh={getHotels}
        style={{marginTop: 5}}
        // disableLeftSwipe={true}
        disableRightSwipe={true}
        data={hotels}
        renderItem={(data, rowMap) => (
          <>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
              <View style={styles.rowFront}>
                <HotelItem
                  key={data.index}
                  item={data.item}
                  navigation={navigation}
                />
              </View>
            </View>
          </>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditHotel', {id: data.item.hotel_id});
              }}
              style={{
                backgroundColor: 'green',
                width: 45,
                height: 90,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="edit" size={22} color={WHITE} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                deleteHotel({id: data.item.hotel_id});
              }}
              style={{
                backgroundColor: 'red',
                width: 45,
                height: 90,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="delete" size={22} color={WHITE} />
            </TouchableOpacity>
          </View>
        )}
        // leftOpenValue={1000}
        rightOpenValue={-100}
      />
      <TouchableOpacity style={styles.plusButton} onPress={handlePressAdd}>
        <Icon name="plus" size={30} color={WHITE}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plusButton: {
    backgroundColor: BLUE2,
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 10,
    right: 5,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 5,
  },
  rowFront: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
export default HotelList;
