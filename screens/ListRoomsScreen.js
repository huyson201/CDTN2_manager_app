import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Picker,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLUE1, DARK_GRAY, MAP_MARKER} from '../src/values/color';
import {SEARCH_ICON_SIZE, SEARCH_TEXT_SIZE} from '../src/values/size';
import {Button} from 'react-native-elements';
import RoomItem from '../components/room/RoomItem';
import {useSelector} from 'react-redux';
import hotelApi from '../api/hotelApi';
const ListRoomsScreen = function ({navigation}) {
  const [dataSource, setDataSouce] = useState([]);
  const {token} = useSelector(state => state.users);
  const {selectedHotel} = useSelector(state => state.hotels);
  const [rooms,setRooms] = useState([])
  useEffect(() => {
    getRooms(selectedHotel);
  }, [selectedHotel]);
  // MODIFY DATASOUCE HERE
  const getRooms = async id => {
    const res = await hotelApi.getAllRoomsByIdHotel(id);
    if (res.data.data) {
      console.log(res.data.data);
      setRooms(res.data.data)
    }
  };
  // Handle Press Navigation
  const handlePressAddNewRoom = () => {
    navigation.navigate('Add A new Room');
  };
  const handlePressToCommissionScreen = () => {
    navigation.navigate('Commission');
  };
  const handlePressToListTypeRooms = () => {
    navigation.navigate('Status Type Rooms');
  };
  const handlePressToAllRooms = () => {
    navigation.navigate('All Rooms');
  };
  // MODIFY cái cây màu đen nằm giữa các ITEMS
  const ItemSeparatorView = () => {
    return <View style={ListRoomsStyle.ItemSeparatorView} />;
  };
  const [selectedValue, setSelectedValue] = useState('1');
  return (
    <View>
      <View style={ListRoomsStyle.filter}>
        <Picker
          selectedValue={selectedValue}
          style={ListRoomsStyle.filterItems}
          onValueChange={(itemValue, itemIndex) =>
            itemValue == 1
              ? handlePressToAllRooms()
              : itemValue == 2
              ? handlePressAddNewRoom()
              : // : itemValue == 3
                // ? handlePressToMaintainingRooms()
                handlePressToCommissionScreen()
          }>
          <Picker.Item label="All Type Rooms" value="1" />
          <Picker.Item label="Add new Room" value="2" />
          {/* <Picker.Item label="Commission" value="3" /> */}
          {/* <Picker.Item label="Rooms Ordered" value="4" /> */}
        </Picker>
      </View>
      <FlatList
        style={{marginTop: 5}}
        data={rooms}
        renderItem={({item, index}) => {
          return (
            // MODIFY ITEMSVIEW HERE
            // <TouchableOpacity
            //   onPress={handlePressToListTypeRooms}
            //   key={index}
            //   style={ListRoomsStyle.listItemStyle}>
            //   <View style={ListRoomsStyle.itemBody}>
            //     {/* <Image
            //       style={ListRoomsStyle.itemBoDyImg}
            //       source={require('../src/images/detail_hotel_2.jpeg')}
            //     /> */}
            //     <View style={ListRoomsStyle.itemBoDyText}>
            //       <Text
            //         style={ListRoomsStyle.itemFont_HotelName}
            //         numberOfLines={1}>
            //         {item.username}
            //       </Text>
            //       <Text
            //         style={ListRoomsStyle.itemFont_HotelStar}
            //         numberOfLines={1}>
            //         {printRating(item.id)}
            //       </Text>
            //       <Text style={ListRoomsStyle.itemFont} numberOfLines={1}>
            //         Total: {item.id} $
            //       </Text>
            //       <Text numberOfLines={1}>
            //         Address:{item.address.suite},{item.address.city}
            //       </Text>
            //     </View>
            //   </View>
            //   <ItemSeparatorView />
            // </TouchableOpacity>

            <RoomItem item={item}></RoomItem>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
