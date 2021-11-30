import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  StatusBar,
  Alert,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLUE1, BLUE2, DARK_GRAY, MAP_MARKER, WHITE} from '../src/values/color';
import {SEARCH_ICON_SIZE, SEARCH_TEXT_SIZE} from '../src/values/size';
import {Button, Image} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../components/permission/permission';
import roomApi from '../api/roomApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNewRoomScreen = function ({navigation, route}) {
  // room_name, hotel_id: +hotel_id, room_desc, room_area, room_price, room_beds: +room_beds, room_quantity: +room_quantity, room_num_people: +room_num_people, room_imgs: roomImgsUrl.join()
  const id = route.params.id;
  console.log(id, 'id hotel ne');
  const [room_name, setRoomName] = useState();
  const [room_desc, setRoomDesc] = useState();
  const [room_area, setRoomArea] = useState();
  const [room_price, setRoomPrice] = useState();
  const [room_beds, setRoomBed] = useState();
  const [room_quantity, setRoomQuantity] = useState();
  const [room_num_people, setNumPeople] = useState();
  const [services, setServices] = useState();
  const [roomImgsUrl, setRoomImg] = useState([]);
  const [checkSelectImage, setCheckSelectImage] = useState(false);

  const handlePressAdd = async () => {
    const token = await AsyncStorage.getItem('token');
    let formData = new FormData();
    try {
      formData.append('hotel_id', id && id);
      formData.append('room_name', room_name && room_name);
      formData.append('room_desc', room_desc && room_desc);
      formData.append('room_area', room_area && room_area);
      formData.append('room_price', room_price && room_price);
      formData.append('room_beds', room_beds && room_beds);
      formData.append('room_quantity', room_quantity && room_quantity);
      formData.append('room_num_people', room_num_people && room_num_people);
      formData.append('services', services && services);

      if (roomImgsUrl.length > 0) {
        roomImgsUrl.forEach(element => {
          formData.append('room_imgs', element);
        });
      }
      const res = await roomApi.create(formData, token);
      if (res.data.data) {
        ToastAndroid.show('Thêm phòng thành công', ToastAndroid.SHORT);
        // dispatch(setServices(null));
        navigation.navigate('AllRooms');
      }
      console.log(
        res.data.data,
        '===================add thành công òi ne=================',
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handlePressCancel = () => {
    navigation.goBack();
  };

  const onSlectImage = async () => {
    const permission = await androidCameraPermission();
    // console.log(permission);
    if (permission) {
      Alert.alert('', 'Ảnh chi tiết phòng', [
        {text: 'Hủy', onPress: () => {}},
        {text: 'Chọn ảnh từ thư viện', onPress: onGallery},
        {text: 'Chụp ảnh mới', onPress: onCamera},
      ]);
    }
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      useFrontCamera: true,
      // mediaType: 'any',
    }).then(image => {
      setRoomImg({
        uri: image.path,
        type: image.mime,
        name: image.path.split('/')[image.path.split('/').length - 1],
        data: image.data,
      });
    });
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      includeBase64: true,
    }).then(image => {
      let arr = [];
      if (image.length > 0) {
        if (!roomImgsUrl || roomImgsUrl.length === 0) {
          image.forEach(e => {
            arr.push({
              uri: e.path,
              type: e.mime,
              name: e.path.split('/')[e.path.split('/').length - 1],
              data: e.data,
            });
          });
        } else {
          arr = [...roomImgsUrl];
          image.forEach(e => {
            arr.push({
              uri: e.path,
              type: e.mime,
              name: e.path.split('/')[e.path.split('/').length - 1],
              data: e.data,
            });
          });
        }
      }
      setRoomImg([...arr]);
    });
  };

  useEffect(() => {
    if (checkSelectImage) {
      onSlectImage();
    }
    return setCheckSelectImage();
  }, [checkSelectImage]);

  return (
    <View>
      {/* BODY CONTENT */}
      <ScrollView style={{height: '100%', width: '100%'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setCheckSelectImage(true);
            }}
            style={styles.scrollImg}>
            <View style={styles.borderImg}>
              <MaterialCommunityIcons
                name="camera-plus"
                size={25}
                color={DARK_GRAY}
              />
            </View>
          </TouchableOpacity>
          <ScrollView
            style={styles.scrollImg}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {roomImgsUrl.length > 0 &&
              roomImgsUrl.map((e, i) => {
                return (
                  <View key={i} style={styles.borderImg}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        console.log('update hoac delete slide item');
                      }}>
                      <Image
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: 'cover',
                          borderWidth: 2,
                          borderColor: '#ccc',
                          borderRadius: 10,
                        }}
                        source={{
                          uri: `data:${e.type};base64,${e.data}`,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </ScrollView>
        </View>
        {/* Room name */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="monument"
            size={20}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            placeholder="Room Name "
            autoCapitalize="none"
            onChangeText={val => setRoomName(val)}
            style={ListRoomsStyle.textInput}
          />
        </View>
        {/* Room price */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="money-bill-wave"
            size={20}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            placeholder="Room price"
            autoCapitalize="none"
            onChangeText={val => setRoomPrice(val)}
            style={ListRoomsStyle.textInput}
          />
        </View>
        {/* Room Bed */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="bed"
            size={20}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            placeholder="Room bed"
            onChangeText={val => setRoomBed(val)}
            autoCapitalize="none"
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room Area */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="chart-area"
            size={20}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            placeholder="Room Area"
            autoCapitalize="none"
            onChangeText={val => setRoomArea(val)}
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room Quantity */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="sort-numeric-up-alt"
            size={20}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            placeholder="Room Quantity"
            autoCapitalize="none"
            onChangeText={val => setRoomQuantity(val)}
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room Max People */}
        <View style={ListRoomsStyle.action}>
          <Icon
            style={ListRoomsStyle.icon}
            name="user-alt"
            size={20}
            backgroundColor="#05375a"
            color="#05375a"></Icon>
          <TextInput
            placeholder="Max people"
            autoCapitalize="none"
            onChangeText={val => setNumPeople(val)}
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* Room Services */}
        <View style={ListRoomsStyle.action}>
          <MaterialIcons
            name="miscellaneous-services"
            size={25}
            style={ListRoomsStyle.icon}
            color="#05375a"
          />
          <TextInput
            placeholder="Room Services"
            autoCapitalize="none"
            onChangeText={val => setServices(val)}
            style={ListRoomsStyle.textInput}></TextInput>
        </View>
        {/* room desc */}
        <View style={ListRoomsStyle.action}>
          <Text style={{fontSize: 17, paddingTop: 10}}>Mô tả: </Text>
          <TextInput
            onChangeText={val => setRoomDesc(val)}
            multiline={true}
            numberOfLines={3}
            style={{textAlignVertical: 'top', flex: 1}}
          />
        </View>
        {/* Action */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity style={styles.button} onPress={handlePressCancel}>
            <Text style={styles.text_button}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePressAdd}>
            <Text style={styles.text_button}>Add</Text>
          </TouchableOpacity>
        </View>
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
  scrollImg: {
    marginVertical: 10,
    marginRight: 5,
  },
  borderImg: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: BLUE2,
    borderRadius: 10,
    // display: 'flex',
    // alignContent:'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  button: {
    backgroundColor: BLUE2,
    width: 150,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text_button: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 15,
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
    paddingLeft: 20,
    fontSize: 15,
    flex: 1,
    color: '#000',
  },
  icon: {
    paddingTop: 13,
    // paddingRight: 15,
  },
  action: {
    paddingLeft: 5,
    marginHorizontal: 25,
    flexDirection: 'row',
    // borderTopWidth: 1,
    // borderTopColor: '#000',
    borderBottomWidth: 0.5,
    borderBottomColor: '#010101',
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
