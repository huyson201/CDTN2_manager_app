import {useIsFocused} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HotelItem} from '../components/hotel/HotelItem';
import {
  getHotelsOfUser,
  hotelSelectors,
  removeSelectedHotel,
} from '../features/hotel/hotelSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {SwipeListView} from 'react-native-swipe-list-view';
import {BLUE2, WHITE} from '../src/values/color';
const HotelList = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.users);
  const hotels = useSelector(hotelSelectors.selectAll);
  useEffect(() => {
    dispatch(getHotelsOfUser({id: user.user_uuid, userToken: token}));
  }, [isFocused]);
  useEffect(() => {
    if (isFocused) {
      dispatch(removeSelectedHotel());
    }
  }, [isFocused]);
  const handlePressAdd = () => {
    navigation.navigate('AddHotel');
  };

  return (
    <View style={styles.container}>
      <SwipeListView
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
              onPress={() => console.log('swipe')}
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
