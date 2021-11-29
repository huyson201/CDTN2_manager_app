import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import styled from 'styled-components';
import {DARK_GRAY, GOLD_COLOR, WHITE} from '../../src/values/color';
import {HOTEL_TEXT, VND} from '../../src/values/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {
  removeSelectedHotel,
  setSelectedHotel,
} from '../../features/hotel/hotelSlice';
import {formatCurrency} from '../../src/utilFunc';
const RoomItem = ({item}) => {
  console.log(item);
  const images = item.room_imgs.split(',');
  console.log(images);
  return (
    <>
      <ItemContainer
        activeOpacity={0.9}
        onPress={() => {
          dispatch(setSelectedHotel(item.hotel_id));
          navigation.push('DashBoard');
        }}>
        <ViewRow>
          <Image style={styles.hotelImage} source={{uri: images[0]}} />
          <ItemContent style={{flex: 1, marginRight: 7}}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.headText}>
              {item.room_name}
            </Text>
            {/* Star */}
            {/* <ViewRow>{stars}</ViewRow> */}
            {/* Address */}
            <ViewRow style={{marginBottom: 5}}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                Tình trạng:{' '}
              </Text>
              {item.room_quantity > 0 && (
                <Text style={{fontSize: 15}}>
                  Còn {item.room_quantity} phòng
                </Text>
              )}
            </ViewRow>
            <ViewRow>
              <Text style={{fontSize: 15, fontWeight: '600'}}>Giá:</Text>
              <Text style={{fontSize: 15}}>
                {formatCurrency(+item.room_price, '')} VND
              </Text>
            </ViewRow>

            {/* <Text style={styles.contentText}>{HOTEL_TEXT}</Text> */}
          </ItemContent>
        </ViewRow>
      </ItemContainer>
    </>
  );
};

const ItemContainer = styled.TouchableOpacity`
  background-color: ${WHITE};
  border-radius: 8px;
  margin: 5px 10px;
`;
const ItemContent = styled.View`
  margin-top: 8px;
  margin-left: 5px;
`;
const ViewRow = styled.View`
  flex-direction: row;
`;

const styles = StyleSheet.create({
  hotelImage: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  starIcon: {
    backgroundColor: GOLD_COLOR,
  },
  headText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contentText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: '90%',
    width: '100%',
    marginLeft: 5,
  },
  addressText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: '90%',
    width: '100%',
    marginLeft: 5,
    marginTop: 5,
  },
  priceText: {
    fontSize: 11,
    color: DARK_GRAY,
    maxWidth: '90%',
    width: '100%',
    marginLeft: 5,
    marginTop: 60,
    textDecorationLine: 'line-through',
  },
});
export default RoomItem;
