import { useIsFocused } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HotelItem } from '../components/hotel/HotelItem';
import { getHotelsOfUser, hotelSelectors, removeSelectedHotel } from '../features/hotel/hotelSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WHITE,BLUE2 } from '../src/values/color';
const HotelList = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.users);
  const hotels = useSelector(hotelSelectors.selectAll);
  // const staffs = useSelector(staffSelectors.selectAll);
  useEffect(() => {
    dispatch(getHotelsOfUser({id: user.user_uuid, userToken: token}));
  }, []);
  useEffect(() => {
   if(isFocused){
    dispatch(removeSelectedHotel())
   }
  }, [isFocused]);
  const handlePressAdd = () => {
    navigation.navigate('AddHotel');
  };

  return (
    <View>
      <FlatList
        style={{ marginTop: 5 }}
        data={hotels}
        renderItem={({ item, index }) => {
          return (
            <View>
              <HotelItem
                key={index}
                item={item}
                navigation={navigation}
              />
            </View>
          );
        }}
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
});
export default HotelList;
