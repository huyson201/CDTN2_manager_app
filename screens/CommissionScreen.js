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

const CommissionScreen = function ({navigation}) {
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
  // Handle Press Navigation
  const handlePressToAllRooms = () => {
    navigation.goBack();
  };
  const handlePressToCommissionScreen = () => {
    navigation.navigate('Commission');
  };
  // const handlePressToListTypeRooms = () => {
  //    navigation.navigate("Sta");
  // };
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
  const getMonth = id => {
    if (id > 12) {
      return id % 12;
    } else {
      return id;
    }
  };
  return (
    <View>
      {/* MODIFY HEADER */}
      <View style={ListRoomsStyle.header}>
        <View style={ListRoomsStyle.headerUserCicle}>
          <View>
            <Image
              style={ListRoomsStyle.userImg}
              source={require('../src/images/list.png')}
            />
          </View>
        </View>
      </View>
      <View style={ListRoomsStyle.filter}>
        <Picker
          selectedValue={selectedValue}
          style={ListRoomsStyle.filterItems}
          onValueChange={
            (itemValue, itemIndex) =>
              itemValue == 1
                ? handlePressToAllRooms()
                : // : itemValue == 2
                  handlePressToCommissionScreen()
            // : itemValue == 3
            // ? handlePressToMaintainingRooms()
            // : handlePressToOrderedRooms()
          }>
          <Picker.Item label="All Type Rooms" value="1" />
          <Picker.Item label="Commission" value="2" />
          {/* <Picker.Item label="Rooms Maintaining" value="3" /> */}
          {/* <Picker.Item label="Rooms Ordered" value="4" /> */}
        </Picker>
      </View>

      <FlatList
        style={{marginTop: 5}}
        data={dataSource}
        renderItem={({item, index}) => {
          return (
            // MODIFY ITEMSVIEW HERE
            <View style={{alignContent: 'center'}}>
              <Text>Month : {getMonth(item.id)}</Text>
              <Text>Commission : {item.id} %</Text>
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

export default CommissionScreen;
