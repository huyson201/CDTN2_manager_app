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
// import History from '../src/components/home/History';
// import About from '../src/components/home/About';
import ListRoomsScreen from './ListRoomsScreen';
import {SliderBox} from 'react-native-image-slider-box';
import ListRoomsTypeStatusMaintainScreen from './ListRoomsTypeStatusMaintainScreen';

const ListRoomsByTypeScreen = function ({navigation}) {
  const [dataSource, setDataSouce] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  // MODIFY DATASOUCE HERE
  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(responseJson => {
        setDataSouce(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handlePressAddNewRoom = () => {
    navigation.navigate('Add A new Room');
  };
  const handlePressToAvailableRooms = () => {
    navigation.navigate('Rooms Available');
  };
  const handlePressToMaintainingRooms = () => {
    navigation.navigate('Rooms Maintaining');
  };
  const handlePressToOrderedRooms = () => {
    navigation.navigate('Rooms Ordered');
  };
  const handlePressToAllRooms = () => {
    navigation.navigate('Type Rooms');
  };

  // DEMO SLIDERBOX
  const data = {
    images: [
      'https://source.unsplash.com/1024x768/?room',
      'https://source.unsplash.com/1024x768/?hotel',
      'https://source.unsplash.com/1024x768/?bathroom',
      'https://source.unsplash.com/1024x768/?car', // Network image
      // require('./assets/images/girl.jpg'), // Local image
    ],
  };
  // PRINT RATING
  const printRating = star => {
    var rating = [];
    for (let i = 0; i < 5; i++) {
      rating.push(
        <Icon
          name="star"
          size={25}
          backgroundColor="#cfc021"
          color="#cfc021"></Icon>,
      );
    }
    return rating;
  };

  // MODIFY cái cây màu đen nằm giữa các ITEMS
  const ItemSeparatorView = () => {
    return <View style={ListRoomsStyle.ItemSeparatorView} />;
  };
  const [selectedValue, setSelectedValue] = useState('1');
  return (
    <View>
      {/* MODIFY HEADER */}
      {/* <View style={ListRoomsStyle.header}> */}
      <SliderBox
        // key={Math.random()}
        images={data.images}
        paginationBoxVerticalPadding={5}
        dotStyle={{width: 7, height: 7, marginHorizontal: -5}}
        imageLoadingColor={'#fff'}
        // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        // currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
      />
      {/* <SliderBox
          key={Math.random()}
          images={dataHotel.images}
          paginationBoxVerticalPadding={5}
          dotStyle={{width: 7, height: 7, marginHorizontal: -5}}
          imageLoadingColor={'#fff'}
        /> */}
      {/* </View> */}
      {/* FILTER */}
      <View style={ListRoomsStyle.filter}>
        {/* <TouchableOpacity
          onPress={handlePressAddNewRoom}
          style={ListRoomsStyle.filterItems}>
          <Text style={{textAlign: 'center', marginTop: 15}}>Add New Room </Text>
        </TouchableOpacity> */}
        <Picker
          selectedValue={selectedValue}
          style={ListRoomsStyle.filterItems}
          onValueChange={(itemValue, itemIndex) =>
            itemValue == 1
              ? handlePressToAllRooms()
              : itemValue == 2
              ? handlePressToAvailableRooms()
              : itemValue == 3
              ? handlePressToMaintainingRooms()
              : handlePressToOrderedRooms()
          }>
          <Picker.Item label="All Rooms" value="1" />
          <Picker.Item label="Rooms Available" value="2" />
          <Picker.Item label="Rooms Maintaining" value="3" />
          <Picker.Item label="Rooms Ordered" value="4" />
        </Picker>
      </View>
      <FlatList
        style={{marginTop: 5, height: '100%'}}
        data={dataSource}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            // MODIFY ITEMSVIEW HERE
            <View style={styles.container}>
              <TouchableOpacity style={styles.item}>
                <View style={ListRoomsStyle.roomView}>
                  <Text style={ListRoomsStyle.roomViewText}>
                    RoomNo:{' '}
                    <Text style={ListRoomsStyle.roomViewID}> {item.id}</Text>
                  </Text>
                  <Text style={ListRoomsStyle.roomViewText}>
                    Status: {'  '}
                    <Text
                      style={
                        item.id % 5 == 0
                          ? ListRoomsStyle.roomViewStatus
                          : item.id % 3 == 0
                          ? ListRoomsStyle.roomViewStatusOrdered
                          : ListRoomsStyle.roomViewStatusMaintaining
                      }>
                      {/* {item.username} */}
                      Available
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  item: {
    width: '90%', // is 50% of container width
    marginHorizontal: '5%',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 1,
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
    backgroundColor: BLUE1,
    paddingTop: 10,
    paddingBottom: 25,
    color: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  filter: {
    display: 'flex',
    flexDirection: 'row',
  },
  filterItems: {
    flex: 1,
  },
  roomView: {},
  roomViewText: {
    fontStyle: 'italic',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  roomViewID: {
    fontSize: 20,
  },
  roomViewStatus: {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
  },
  roomViewStatusOrdered: {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
  },
  genderPicker: {
    // borderRadius: 40,
    // borderWidth: 1,
    // borderColor: '#bdc3c7',
    overflow: 'hidden',
  },
  roomViewStatusMaintaining: {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
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
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // marginBottom: 0,
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
  toPropertiesItemBtn: {
    height: 35,
    borderRadius: 50,
  },
});

export default ListRoomsByTypeScreen;
