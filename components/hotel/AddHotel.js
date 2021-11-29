import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import {WHITE, BLUE2, DARK_GRAY} from '../../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import hotelApi from '../../api/hotelApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../permission/permission';
import addressApi from '../../api/addressApi';
import serviceApi from '../../api/serviceApi';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {ModalServices} from './ModalServices';
import {useDispatch, useSelector} from 'react-redux';
import {setServices} from '../../features/hotel/hotelSlice';
import {Image} from 'react-native-elements';

const AddHotel = ({navigation, route}) => {
  // hotel_name, hotel_star: +hotel_star, hotel_address, hotel_phone, hotel_desc, hotel_img, hotel_slide
  const [hotel_name, setHotelName] = useState();
  const [hotel_star, setHotelStar] = useState();
  const [hotel_phone, setHotelPhone] = useState();
  const [hotel_desc, setHotelDesc] = useState();
  const [hotel_img, setHotelImgAvt] = useState();
  const [hotel_slide, setHotelSlide] = useState([]);
  const [checkSelectImage, setCheckSelectImage] = useState();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [services, setServiceList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedCommune, setSelectedCommune] = useState();

  const serviceRef = useRef();
  const serviceRedux = useSelector(state => state.hotels.services);

  const dispatch = useDispatch();
  const handleAddHotel = async () => {
    const token = await AsyncStorage.getItem('token');
    let formData = new FormData();
    let address = mergeAddress();
    try {
      formData.append('hotel_name', hotel_name && hotel_name);
      formData.append('hotel_star', hotel_star && +hotel_star);
      formData.append('hotel_address', address);
      formData.append('hotel_phone', hotel_phone && hotel_phone);
      formData.append('hotel_desc', hotel_desc && hotel_desc);
      formData.append('services', serviceRedux && serviceRedux.toString());
      formData.append('avatar', hotel_img && hotel_img);

      if (hotel_slide.length > 0) {
        hotel_slide.forEach(element => {
          formData.append('photos', element);
        });
      }
      const res = await hotelApi.create(formData, token);
      if (res.data.data) {
        ToastAndroid.show('Thêm khách sạn thành công', ToastAndroid.SHORT);
        dispatch(setServices(null));
        navigation.navigate('HotelList');
      }
      console.log(
        res.data.data,
        '===================add thành công òi ne=================',
      );
    } catch (error) {
      console.log(error);
    }
  };
  //ket hop tinh huyen xa
  const mergeAddress = () => {
    if (+selectedCommune !== -1) {
      const currentCommune = communes[selectedCommune];
      let newAddress = `${currentCommune.name}, ${currentCommune.district}, ${currentCommune.province}`;
      return newAddress;
    } else if (+selectedDistrict !== -1) {
      const currentDistrict = districts[selectedDistrict];
      let newAddress = `${currentDistrict.name}, ${currentDistrict.province}`;
      return newAddress;
    } else if (+selectedProvince !== -1) {
      const currentProvince = provinces[selectedProvince];
      let newAddress = `${currentProvince.name}`;
      return newAddress;
    }
  };

  const handleCancel = () => {
    navigation.navigate('HotelList');
  };

  const onSlectImage = async () => {
    const permission = await androidCameraPermission();
    // console.log(permission);
    if (permission) {
      Alert.alert(
        '',
        `${
          checkSelectImage === 'avt'
            ? 'Ảnh đại diện khách sạn'
            : 'Ảnh chi tiết khách sạn'
        }`,
        [
          {text: 'Hủy', onPress: () => {}},
          {text: 'Chọn ảnh từ thư viện', onPress: onGallery},
          {text: 'Chụp ảnh mới', onPress: onCamera},
        ],
      );
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
      if (checkSelectImage && checkSelectImage === 'avt') {
        setHotelImgAvt({
          uri: image.path,
          type: image.mime,
          name: image.path.split('/')[image.path.split('/').length - 1],
          data: image.data,
        });
      } else if (checkSelectImage && checkSelectImage === 'gallery') {
        setHotelSlide([
          {
            uri: image.path,
            type: image.mime,
            name: image.path.split('/')[image.path.split('/').length - 1],
            data: image.data,
          },
        ]);
      }
    });
  };

  const onGallery = () => {
    let bool = true;
    if (checkSelectImage === 'avt') {
      bool = false;
    }
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: bool,
      includeBase64: true,
    }).then(image => {
      if (bool === false) {
        setHotelImgAvt({
          uri: image.path,
          type: image.mime,
          name: image.path.split('/')[image.path.split('/').length - 1],
          data: image.data,
        });
      } else {
        let arr = [];
        if (image.length > 0) {
          if (!hotel_slide) {
            image.forEach(e => {
              arr.push({
                uri: e.path,
                type: e.mime,
                name: e.path.split('/')[e.path.split('/').length - 1],
                data: e.data,
              });
            });
          } else {
            arr = [...hotel_slide];
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
        setHotelSlide([...arr]);
      }
    });
  };

  useEffect(() => {
    // console.log(checkSelectImage);
    if (checkSelectImage) {
      onSlectImage();
    }
    return setCheckSelectImage();
  }, [checkSelectImage]);

  // get provinces
  useEffect(() => {
    async function getData() {
      let res = await addressApi.getProvince();
      let results = [...res.data.results];
      setProvinces([...results]);
    }

    async function getServices() {
      const res = await serviceApi.getService();
      let result = [];
      if (res.data.data) {
        res.data.data.forEach(element => {
          result.push({item: element.service_name, id: element.service_id});
        });
      }
      setServiceList([...result]);
    }
    getData();
    getServices();
  }, []);

  // load districts
  useEffect(() => {
    async function getData() {
      if (+selectedProvince === -1) return;
      if (provinces[selectedProvince]) {
        let res = await addressApi.getDistrict(
          provinces[selectedProvince].code,
        );
        let results = [...res.data.results];
        setDistricts([...results]);
      }
    }

    if (+selectedProvince !== -1) {
      getData();
    }
  }, [selectedProvince]);

  // load communes
  useEffect(() => {
    async function getData() {
      if (+selectedDistrict === -1) return;
      if (districts[selectedDistrict]) {
        let res = await addressApi.getCommune(districts[selectedDistrict].code);
        let results = [...res.data.results];
        setCommunes([...results]);
      }
    }

    if (+selectedDistrict !== -1) {
      getData();
    }
  }, [selectedDistrict]);

  // generate picker item of provinces
  let provincesPickerItem = useMemo(() => {
    // console.log(provinces);
    return generatePickerItem(provinces);
  }, [provinces]);

  let districtsPickerItem = useMemo(() => {
    return generatePickerItem(districts);
  }, [districts]);

  let communesPickerItem = useMemo(() => {
    return generatePickerItem(communes);
  }, [communes]);

  return (
    <ScrollView>
      {/* Image */}
      {hotel_img ? (
        <TouchableOpacity
          onPress={() => {
            setCheckSelectImage('avt');
          }}>
          <Image
            style={styles.hotelImg}
            source={{
              uri:
                hotel_img && `data:${hotel_img.type};base64,${hotel_img.data}`,
            }}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setCheckSelectImage('avt');
              // onSlectImage();
            }}>
            <ImageBackground
              style={styles.imgStaff}
              imageStyle={{borderRadius: 15}}
              source={hotel_img && hotel_img.uri}>
              <View style={styles.view_camera}>
                {!hotel_img && (
                  <Icon
                    name="camera"
                    size={25}
                    color={WHITE}
                    style={styles.icon_camera}
                  />
                )}
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )}

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setCheckSelectImage('gallery');
            // onSlectImage();
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
          {hotel_slide.length > 0 &&
            hotel_slide.map((e, i) => {
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

      {/* Input infor */}
      <View style={{marginLeft: 20, marginRight: 20}}>
        {/* Hotel name */}
        <View style={styles.flex_row}>
          <Icon name="hotel" size={23} style={styles.icon} />
          <TextInput
            placeholder="Hotel Name"
            autoCapitalize="none"
            onChangeText={val => setHotelName(val)}
            style={{
              fontSize: 17,
              paddingLeft: 20,
              flex: 1,
            }}
          />
        </View>
        {/* Phone number */}
        <View style={styles.flex_row}>
          <Icon name="phone-alt" size={23} style={styles.icon} />
          <TextInput
            placeholder="Phone number"
            autoCapitalize="none"
            onChangeText={val => setHotelPhone(val)}
            style={{
              fontSize: 17,
              paddingLeft: 20,
              flex: 1,
            }}
          />
        </View>
        {/* Star */}
        <View style={styles.flex_row}>
          <Icon2 name="star" size={30} style={styles.icon} />
          <Picker
            selectedValue={hotel_star ? hotel_star : setHotelStar(1)}
            style={{flex: 1}}
            onValueChange={itemValue => {
              setHotelStar(itemValue);
            }}>
            <Picker.Item label="1" value="1" style={{fontSize: 17}} />
            <Picker.Item label="2" value="2" style={{fontSize: 17}} />
            <Picker.Item label="3" value="3" style={{fontSize: 17}} />
            <Picker.Item label="4" value="4" style={{fontSize: 17}} />
            <Picker.Item label="5" value="5" style={{fontSize: 17}} />
          </Picker>
        </View>
        {/* Address */}
        <View style={styles.flex_row}>
          <Entypo name="location" size={25} style={styles.icon} />
          <Picker
            selectedValue={selectedProvince}
            style={{flex: 1}}
            onValueChange={itemValue => {
              setSelectedProvince(itemValue);
              setSelectedDistrict(-1);
              setSelectedCommune(-1);
            }}>
            <Picker.Item
              label="Chọn tỉnh / Thành phố"
              value={-1}
              style={{fontSize: 17}}
            />
            {provincesPickerItem}
          </Picker>
        </View>

        <View style={styles.flex_row}>
          <Entypo name="location" size={25} style={styles.icon} />
          <Picker
            style={{flex: 1}}
            selectedValue={selectedDistrict}
            onValueChange={itemValue => {
              setSelectedDistrict(itemValue);
              setSelectedCommune(-1);
            }}>
            <Picker.Item
              label="Chọn Quận / Huyện"
              value={-1}
              style={styles.pickerItemStyle}
            />
            {+selectedProvince !== -1 && districtsPickerItem}
          </Picker>
        </View>

        <View style={styles.flex_row}>
          <Entypo name="location" size={25} style={styles.icon} />
          <Picker
            style={{flex: 1}}
            selectedValue={selectedCommune}
            onValueChange={itemValue => setSelectedCommune(itemValue)}>
            <Picker.Item
              label="Chọn Phường / Xã"
              value={-1}
              style={styles.pickerItemStyle}
            />
            {+selectedDistrict !== -1 && communesPickerItem}
          </Picker>
        </View>

        <View style={styles.flex_row}>
          <MaterialIcons
            name="miscellaneous-services"
            size={25}
            style={styles.icon}
          />
          <ModalServices ref={serviceRef} services={services} />
          <Button
            title={
              'Chọn dịch vụ' +
              `${serviceRedux ? ' (' + serviceRedux.length + ')' : ''}`
            }
            titleStyle={{color: '#000'}}
            buttonStyle={{width: 290}}
            onPress={() => {
              serviceRef.current.show();
            }}
          />
        </View>
        {/* Hotel desc */}
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text style={{fontSize: 17, paddingTop: 10}}>Mô tả: </Text>
          <TextInput
            onChangeText={val => setHotelDesc(val)}
            multiline={true}
            numberOfLines={3}
            style={{textAlignVertical: 'top', flex: 1}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.text_button}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAddHotel}>
            <Text style={styles.text_button}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: BLUE2,
  },
  imgStaff: {
    width: 110,
    height: 110,
  },
  view_camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_camera: {
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: WHITE,
    borderRadius: 10,
    padding: 5,
  },
  flex_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: BLUE2,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingTop: 20,
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
  icon: {
    paddingTop: 13,
    color: BLUE2,
  },
  picker: {
    width: '100%',
    height: 0,
  },
  text_button: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 15,
  },
  scrollView: {
    paddingBottom: 10,
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
  pickerItemStyle: {
    borderWidth: 1,
    borderBottomColor: '#ccc',
    borderStyle: 'solid',
  },
  hotelImg: {
    width: '100%',
    height: 210,
    resizeMode: 'cover',
  },
});

const generatePickerItem = (data = []) => {
  if (!Array.isArray(data) || data.length <= 0) return;

  return data.map((el, index) => {
    return (
      <Picker.Item
        label={el.name}
        value={index}
        style={styles.pickerItemStyle}
        key={el.code}
      />
    );
  });
};

export default AddHotel;
