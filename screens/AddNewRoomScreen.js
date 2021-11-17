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
import {
  launchCamera,
  launchImageLibrary,
  ImagePicker,
} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-picker';
// import History from '../src/components/home/History';
// import About from '../src/components/home/About';

const AddNewRoomScreen = function ({navigation}) {
  // const [imageUri, setimageUri] = useState('');
  // const [dataSource, setDataSouce] = useState([]);
  // useEffect(() => {
  //   getData();
  // }, []);
  // MODIFY DATASOUCE HERE
  // const getData = () => {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       setDataSouce(responseJson);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };
  const handlePressUserProfile = () => {
    navigation.navigate('Type Rooms');
  };
    const handlePressCancel = () => {
    navigation.goBack();
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
  // Import img
  const [imageUri, setimageUri] = useState('');
  const OpenCamera = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //  display the image:

        const source = {
          uri: response.assets[0].uri,
        };
        console.log(source);
        // console.log('uri',response.assets[0].uri);
        setimageUri(source);
      }
    });
  };
  const OpenGalery = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
        selectionLimit: 0,
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //  display the image:

        const source = {
          uri: response.assets[0].uri,
        };
        console.log(source);
        // console.log('uri',response.assets[0].uri);
        setimageUri(source);
      }
    });
  };
  const [selectedValue, setSelectedValue] = useState('1');
  const ItemButtonView = () => {
    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        {/* To ListRooms Screen */}

        <View
          style={[ListRoomsStyle.funtionBtnItem, {backgroundColor: 'green'}]}>
          <TouchableOpacity
          //  onPress={handleToListRooms}
          >
            <Text>
              <Icon
                style={ListRoomsStyle.icon}
                name="check"
                size={40}
                backgroundColor="#05375a"
                color="#05375a"></Icon>
            </Text>
          </TouchableOpacity>
        </View>
        {/* Handle Logout */}
        <View
          style={[ListRoomsStyle.funtionBtnItem, {backgroundColor: 'gray'}]}>
          <TouchableOpacity
           onPress={handlePressCancel}
          >
            <Text>
              <Icon
                style={ListRoomsStyle.icon}
                name="ban"
                size={40}
                backgroundColor="#05375a"
                color="#05375a"
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      {/* MODIFY HEADER */}
      <Image
        style={{
          width: '100%',
          height: '50%',
          maxHeight: 200,
          resizeMode: 'stretch',
        }}
        source={{
          uri: 'https://images.homify.com/c_fill,f_auto,q_0,w_740/v1513411774/p/photo/image/2361746/STYLOME_01.jpg',
        }}
      />
      {/* BODY CONTENT */}
      <ScrollView style={{height: 350, width: '100%'}}>
        {/* <Text style={ListRoomsStyle.textTitle}>Full Name</Text> */}
        {/* Room name */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="monument"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            // defaultValue="Name of user"
            placeholder="Room Name "
            autoCapitalize="none"
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room price */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="money-bill-wave"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            // defaultValue="Name of user"
            placeholder="Room price"
            autoCapitalize="none"
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room Bed */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="bed"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            // defaultValue="Name of user"
            placeholder="Room bed"
            autoCapitalize="none"
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room Area */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="chart-area"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            // defaultValue="Name of user"
            placeholder="Room Area"
            autoCapitalize="none"
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room Quantity */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="sort-numeric-up-alt"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            // defaultValue="Name of user"
            placeholder="Room Quantity"
            autoCapitalize="none"
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room Max People */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="user-alt"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            // defaultValue="Name of user"
            placeholder="Max people"
            autoCapitalize="none"
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room Services */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="servicestack"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            // defaultValue="Name of user"
            placeholder="Room Services"
            autoCapitalize="none"
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room Surcharnge */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="pound-sign"
            size={18}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            // defaultValue="Name of user"
            placeholder="Room Surcharnge "
            autoCapitalize="none"
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room IMG */}
        <Picker
          // selectedValue={selectedValue}
          style={ListRoomsStyle.filterItems}
          onValueChange={(itemValue, itemIndex) =>
            itemValue == 1 ? '' : itemValue == 2 ? OpenCamera() : OpenGalery()
          }>
          <Picker.Item label="Add Img"  value="1" />
          <Picker.Item label="OpenCamera" value="2" />
          <Picker.Item label="OpenGalery" value="3" />
        </Picker>
        <View style={ListRoomsStyle.action}>
          {/* <Button
            title="OpenCamera"
            onPress={() => {
              OpenCamera();
            }}></Button>
          <Button
            title="OpenGalery"
            onPress={() => {
              OpenGalery();
            }}></Button> */}

          <Image
            source={imageUri}
            style={{
              height: 100,
              width: 100,
              borderColor: 'black',
              borderWidth: 5,
            }}
          />
        </View>
        <ItemButtonView />
        <View style={ListRoomsStyle.action}></View>
      </ScrollView>
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
  padding: 10px 15px;
  width: 100%;
`;
const ListRoomsStyle = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: BLUE1,
    paddingTop: 15,
    // paddingBottom: 15,
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
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 60,
    resizeMode: 'cover',
  },

  textInput: {
    color: '#000',
  },
  icon: {
    paddingTop: 13,
    paddingRight: 15,
  },
  action: {
    paddingLeft: 20,
    marginTop: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000',
    // borderBottomWidth: 1,
    // borderBottomColor: '#000',
  },
  funtionBtnItem: {
    marginTop: 10,
    flex: 1,
    margin: 5,
    // backgroundColor: '',
    padding: 5,
    alignItems: 'center',
    borderRadius: 300,
    borderWidth: 5,
    borderColor: '#FFF',
  },
});

export default AddNewRoomScreen;
