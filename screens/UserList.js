import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {WHITE, BLUE1, BLUE2} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import StaffItem from '../components/staff/StaffItem';
import Loading from '../components/Loading';
import staffApi from '../api/staffApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  getStaff,
  removeStaffList,
  staffSelectors,
} from '../features/staff/staffSlice';
import {useIsFocused} from '@react-navigation/native';
import userApi from '../api/userApi';
import UserItem from '../components/user/UserItem';
import ModalPopup from '../components/user/ModalPopup';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {ROLE, STAFF_DELETE} from '../src/values/constants';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
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
  const [role, setRole] = useState();
  const [check, setCheck] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState();
  const [firstTime, setFirstTime] = useState(false);
  const handlePressAdd = () => {
    navigation.navigate('AddNewUser');
  };
  const getUsers = async () => {
    setLoading(true);
    const res = await userApi.getUsers(token);
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
  }, [check,isFocused]);
  const updateRole = async () => {
    const formData = new FormData();
    formData.append('user_role',   selectedPosition ? selectedPosition : user.user_role,);
    setLoadingUpdate(true)
    const res = await userApi.update(id, formData, token);
    if (res.data.data) {
      setFirstTime(false);
      setSelectedPosition();
      setVisibleRoleModal(false);
      setLoadingUpdate(false)
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
          title={'Thông tin chi tiết'}
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
                user.user_img !== null
                  ? {
                      uri: user.user_img,
                    }
                  : require('../src/images/staff.jpg')
              }
            />
            {/* <Text style={{textAlign:'center'}}>role</Text> */}
          </View>
          <View style={{flex: 1, flexDirection: 'column', marginLeft: 5}}>
            <View style={styles.flex_row}>
              <Text style={styles.title1}>Họ tên: </Text>
              <Text style={styles.content1}>{user.user_name}</Text>
            </View>
            <View style={styles.flex_row}>
              <Text style={styles.title1}>Email: </Text>
              <Text style={styles.content1}>{user.user_email}</Text>
            </View>
            <View style={styles.flex_row}>
              <Text style={styles.title1}>SĐT: </Text>
              <Text style={styles.content1}>{user.user_phone}</Text>
            </View>
            <View style={styles.flex_row}>
              <Text style={styles.title1}>Vai trò: </Text>
              <Text style={styles.content1}>{ROLE[user.user_role]}</Text>
            </View>
          </View>
        </ModalPopup>
      )}
      {user && (
        <ModalPopup
          setFirstTime={setFirstTime}
          title={'Chọn vai trò'}
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
                selectedValue={!firstTime ? user.user_role : selectedPosition}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedPosition(itemValue);
                  setFirstTime(true);
                }}>
                <Picker.Item label="Admin" value={0} style={{fontSize: 17}} />
                <Picker.Item
                  label="Chủ sở hữu khách sạn"
                  value={1}
                  style={{fontSize: 17}}
                />
                <Picker.Item
                  label="Khách hàng"
                  value={3}
                  style={{fontSize: 17}}
                />
              </Picker>
            </View>
            <Button
              loading={loadingUpdate}
              buttonStyle={styles.button}
              onPress={updateRole}
              title={'Lưu'}></Button>
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
              <UserItem
              setCheck={setCheck}
                setRole={setRole}
                setVisibleRoleModal={setVisibleRoleModal}
                setVisible={setVisible}
                setId={setId}
                setUser={setUser}
                navigation={navigation}
                key={item}
                item={item}
                status={1}></UserItem>
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
