import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import styled from 'styled-components';
import {DARK_GRAY, GOLD_COLOR, WHITE} from '../../src/values/color';
import {HOTEL_TEXT, VND} from '../../src/values/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {removeSelectedHotel, setSelectedHotel} from '../../features/hotel/hotelSlice';
export const HotelItem = ({item, navigation}) => {
  const dispatch = useDispatch();
  let stars = [];
  for (let i = 0; i < item.hotel_star; i++) {
    stars.push(<Icon key={i} name="star" size={15} color={GOLD_COLOR} />);
  }
  return (
    <>
      <ItemContainer
        activeOpacity={0.9}
        onPress={() => {
          dispatch(setSelectedHotel(item.hotel_id));
          navigation.push('DashBoard');
        }}>
        <ViewRow>
          {/* Hotel image */}
          <Image
            style={styles.hotelImage}
            source={{
              uri: item.hotel_img,
            }}
          />
          <ItemContent>
            {/* Hotel name */}
            <Text style={styles.headText}>{item.hotel_name}</Text>
            {/* Star */}
            <ViewRow>{stars}</ViewRow>
            {/* Address */}
            <ViewRow>
              <Icon
                name="map-marker"
                size={12}
                color={DARK_GRAY}
                style={{marginTop: 8}}
              />
              <Text style={styles.addressText}>{item.hotel_address}</Text>
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
    width: 80,
    height: 80,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  starIcon: {
    backgroundColor: GOLD_COLOR,
  },
  headText: {
    fontSize: 16,
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
