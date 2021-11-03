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

const ListRoomsTypeStatusAvailalbeScreen = function ({navigation}) {
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
      'https://source.unsplash.com/1024x768/?nature',
      'https://source.unsplash.com/1024x768/?water',
      'https://source.unsplash.com/1024x768/?girl',
      'https://source.unsplash.com/1024x768/?tree', // Network image
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
  const [selectedValue, setSelectedValue] = useState('2');
  return (
    <View>
      {/* MODIFY HEADER */}
      <SliderBox
        // key={Math.random()}
        images={data.images}
        paginationBoxVerticalPadding={5}
        dotStyle={{width: 7, height: 7, marginHorizontal: -5}}
        imageLoadingColor={'#fff'}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
      />
      {/* FILTER */}
      <View style={ListRoomsStyle.filter}>
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
                    <Text style={ListRoomsStyle.roomViewStatus}>
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
    // height: 150,
    // position: 'relative',
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
  ItemSeparatorView: {
    height: 1,
    width: '100%',
    backgroundColor: '#000000',
  },
});

export default ListRoomsTypeStatusAvailalbeScreen;
