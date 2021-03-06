import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {WHITE, BLUE2} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import StaffItem from '../components/staff/StaffItem';
import staffApi from '../api/staffApi';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import ModalPopup from '../components/user/ModalPopup';
import {STAFF_ROLE} from '../src/values/constants';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-elements';
const UserList = ({navigation}) => {
  const flatList = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.users);
  const {selectedHotel} = useSelector(state => state.hotels);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [id, setId] = useState(-1);
  const [user, setUser] = useState();
  const [check, setCheck] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState();
  const [firstTime, setFirstTime] = useState(false);
  const handlePressAdd = () => {
    navigation.navigate('AddNewUser');
  };
  const getUsers = async () => {
    setLoading(true);
    const res = await staffApi.getStaffByHotelId(selectedHotel, token);
    if (res.data.data) {
      setUsers(res.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
    return () => {
      setLoading(false);
      setUsers([]);
      setCheck(false);
    };
  }, [check, isFocused]);
  const updateRole = async () => {
    const res = await staffApi.updateStaff(
      id,
      selectedPosition ? selectedPosition : user.role,
      token,
    );
    console.log(res.data.data);
    if (res.data.data) {
      setFirstTime(false);
      setSelectedPosition();
      setVisibleRoleModal(false);
      setLoadingUpdate(false);
      setCheck(true);
      setUser();
    }
  };
  const [visible, setVisible] = useState(false);
  const [visibleRoleModal, setVisibleRoleModal] = useState(false);
  return (
    <View style={styles.container}>
      {user && (
        <ModalPopup
          title={'Th??ng tin chi ti???t'}
          setVisible={setVisible}
          visible={visible}>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={styles.imgStaff}
              source={
                user.staff_info.user_img !== null
                  ? {
                      uri: user.staff_info.user_img,
                    }
                  : require('../src/images/staff.jpg')
              }
            />
            {/* <Text style={{textAlign:'center'}}>role</Text> */}
          </View>
          <View style={{flex: 1, flexDirection: 'column', marginLeft: 5}}>
            <View style={styles.flex_row}>
              <Text style={styles.title1}>H??? t??n: </Text>
              <Text style={styles.content1}>{user.staff_info.user_name}</Text>
            </View>
            <View style={styles.flex_row}>
              <Text style={styles.title1}>Email: </Text>
              <Text style={styles.content1}>{user.staff_info.user_email}</Text>
            </View>
            <View style={styles.flex_row}>
              <Text style={styles.title1}>S??T: </Text>
              <Text style={styles.content1}>{user.staff_info.user_phone}</Text>
            </View>
            <View style={styles.flex_row}>
              <Text style={styles.title1}>Vai tr??: </Text>
              <Text style={styles.content1}>{STAFF_ROLE[user.role]}</Text>
            </View>
          </View>
        </ModalPopup>
      )}
      {user && (
        <ModalPopup
          setFirstTime={setFirstTime}
          title={'Ch???n vai tr??'}
          setVisible={setVisibleRoleModal}
          visible={visibleRoleModal}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Icon2 name="location-history" size={25} style={styles.icon} /> */}
            <View style={{borderWidth: 1, marginLeft: 17, borderRadius: 10}}>
              <Picker
                selectedValue={!firstTime ? user.role : selectedPosition}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedPosition(itemValue);
                  setFirstTime(true);
                }}>
                <Picker.Item
                  label="Nh??n vi??n"
                  value={0}
                  style={{fontSize: 17}}
                />
                <Picker.Item label="L??? t??n" value={1} style={{fontSize: 17}} />
              </Picker>
            </View>
            <Button
              loading={loadingUpdate}
              buttonStyle={styles.button}
              onPress={updateRole}
              title={'L??u'}></Button>
          </View>
        </ModalPopup>
      )}
      <FlatList
        ref={flatList}
        data={users}
        refreshing={loading}
        onRefresh={getUsers}
        renderItem={({item}) => {
          return (
            <View style={{backgroundColor: '#ececec'}}>
              <StaffItem
                setCheck={setCheck}
                setVisibleRoleModal={setVisibleRoleModal}
                setVisible={setVisible}
                setId={setId}
                setUser={setUser}
                navigation={navigation}
                key={item}
                item={item}
                status={1}></StaffItem>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.plusButton} onPress={handlePressAdd}>
        <Icon name="plus" size={30} color={WHITE}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  view: {
    margin: 5,
    padding: 10,
    backgroundColor: WHITE,
    borderRadius: 5,
    elevation: 3,
  },
  flex_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imgStaff: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  title1: {
    lineHeight: 25,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content1: {
    lineHeight: 25,
    fontSize: 16,
    maxWidth: '75%',
  },
  picker: {
    width: 290,
    height: 40,
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 30,
    backgroundColor: BLUE2,
    textAlign: 'right',
  },
});

export default UserList;
