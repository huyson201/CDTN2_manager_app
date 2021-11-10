import React, {useState, Component, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {WHITE, BLUE1, BLUE2, LIGHT_GRAY, DARK_GRAY} from '../src/values/color';
import {useDispatch, useSelector} from 'react-redux';
import {removeStaffList, staffSelectors} from '../features/staff/staffSlice';
const data = [
  {
    key: 'Phòng',
    image: require(`../src/images/living-room.png`),
  },

  {
    key: 'Dịch vụ',
    image:  require(`../src/images/customer.png`),
  },
  {
    key: 'Nhân viên',
    image: require(`../src/images/team.png`),
  },
  {
    key: 'Hoá đơn',
    image: require(`../src/images/bill.png`),
  },
  //   {
  //     key: 'Sign out',
  //     image:
  //       'https://cdn-icons.flaticon.com/png/512/3808/premium/3808289.png?token=exp=1636438377~hmac=6008919cd949702a100dbb40d5fe4df7',
  //     onPress: handlePressDashBoard.handleSignout,
  //   },
];

const numColumns = 2;

const DashboardItem = props => {
  const {key, image} = props.dashboardItem;
  const handlePress = () => {
    switch (key) {
      case 'Nhân viên':
        props.navigation.navigate('StaffList');
        break;
      case 'Hoá đơn':
        props.navigation.navigate('TabStatus');
        break;
      default:
        break;
    }
  };
  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <Image style={styles.itemImage} source={image} />
      <View style={styles.border}></View>
      <Text style={styles.itemText}>{key}</Text>
    </TouchableOpacity>
  );
};

const DashBoardScreen = function ({navigation}) {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={({item}) => (
          <DashboardItem dashboardItem={item} navigation={navigation} />
        )}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    marginLeft: 5,
    marginRight: 5,
  },
  item: {
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / numColumns,
    borderRadius: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 17,
    color: DARK_GRAY,
  },
});

export default DashBoardScreen;
