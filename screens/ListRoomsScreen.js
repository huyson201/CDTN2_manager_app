import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import styled from 'styled-components';
import {BLUE1, WHITE, BLUE2} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RoomItem from '../components/room/RoomItem';
import {useSelector} from 'react-redux';
import hotelApi from '../api/hotelApi';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useIsFocused} from '@react-navigation/native';
const ListRoomsScreen = function ({navigation}) {
  const isFocused = useIsFocused();
  const {token} = useSelector(state => state.users);
  const {selectedHotel} = useSelector(state => state.hotels);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(isFocused, 'FOCUS');
  useEffect(() => {
    getRooms();
    return () => {
      setRooms([]);
    };
  }, [selectedHotel, isFocused]);
  // MODIFY DATASOUCE HERE
  const getRooms = async () => {
    setLoading(true);
    const res = await hotelApi.getAllRoomsByIdHotel(selectedHotel);
    if (res.data.data) {
      setRooms(res.data.data);
    }
    setLoading(false);
  };
  // Handle Press Navigation
  const handlePressAddNewRoom = () => {
    navigation.navigate('Add A new Room', {id: selectedHotel});
  };

  return (
    <>
      <View>
        <SwipeListView
          refreshing={loading}
          onRefresh={getRooms}
          style={{marginTop: 5}}
          disableRightSwipe={true}
          data={rooms}
          renderItem={(data, rowMap) => (
            <>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                <View style={styles.rowFront}>
                  <RoomItem item={data.item}></RoomItem>
                </View>
              </View>
            </>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditRoom', {id: data.item.room_id});
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
              {/* <TouchableOpacity
                onPress={() => console.log('swipe')}
                style={{
                  backgroundColor: 'red',
                  width: 45,
                  height: 90,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="delete" size={22} color={WHITE} />
              </TouchableOpacity> */}
            </View>
          )}
          rightOpenValue={-50}
        />
      </View>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={handlePressAddNewRoom}>
        <Icon name="plus" size={30} color={WHITE}></Icon>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
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

const Title = styled.Text`
  color: #fff;
`;

const Container = styled.View`
  padding: 0 15px;
  width: 100%;
`;
const ListRoomsStyle = StyleSheet.create({
  container: {},
  header: {
    // height: 150,
    // position: 'relative',
    backgroundColor: BLUE1,
    paddingTop: 10,
    paddingBottom: 25,
    color: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    fontSize: 20,
  },
  textTitle: {
    fontSize: 20,
    marginLeft: 20,
  },
  headerUserCicle: {
    display: 'flex',
    marginHorizontal: '33%',
    marginBottom: 10,
    height: 100,
    width: 100,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  userImg: {
    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  headerListItemStyle: {
    backgroundColor: '#cfcfcf',
    borderWidth: 2,
    borderColor: '#f96700',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
  },
  listItemStyle: {
    borderRadius: 10,
  },
  itemBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  itemBoDyText: {
    flex: 2,
    flexDirection: 'column',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  itemBoDyImg: {
    flex: 1,
    // flexDirection:'column',
    marginHorizontal: 5,
    marginVertical: 10,
    minWidth: 110,
    minHeight: 110,
    maxWidth: 110,
    maxHeight: 110,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    resizeMode: 'cover',
  },
  ItemSeparatorView: {
    height: 1,
    width: '100%',
    backgroundColor: '#000000',
  },
  itemFont_HotelName: {
    color: '#104FDF',
    fontSize: 25,
  },
  itemFont_HotelStar: {color: '#cfc021', fontSize: 25},
  itemFont_id: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 0,
    marginTop: 0,
    borderWidth: 3,
    borderRadius: 20,
    paddingHorizontal: '40%',
    // paddingVertical: '3%',
    backgroundColor: '#808080',
    color: '#fff',
  },
  itemFont: {
    padding: 10,
    fontSize: 20,
  },
});

export default ListRoomsScreen;
