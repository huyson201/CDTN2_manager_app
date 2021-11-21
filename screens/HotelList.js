import {useIsFocused} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HotelItem} from '../components/hotel/HotelItem';
import {getHotelsOfUser, hotelSelectors, removeSelectedHotel} from '../features/hotel/hotelSlice';
import {removeStaffList, staffSelectors} from '../features/staff/staffSlice';
const HotelList = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.users);
  const hotels = useSelector(hotelSelectors.selectAll);
  const staffs = useSelector(staffSelectors.selectAll);
  useEffect(() => {
    dispatch(getHotelsOfUser({id: user.user_uuid, userToken: token}));
    dispatch(removeSelectedHotel())
  }, []);
  useEffect(() => {
   if(isFocused){
    dispatch(removeSelectedHotel())
   }
  }, [isFocused]);
  return (
    <View>
      <FlatList
        style={{marginTop: 5}}
        data={hotels}
        renderItem={({item, index}) => {
          return (
            <View>
              <HotelItem
                item={item}
                navigation={navigation}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default HotelList;
