import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WHITE} from '../../src/values/color';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  STAFF_EDIT,
  STAFF_DELETE,
  STAFF_ROLE,
  DELETE_SUCCESSFULLY,
  ROLE,
} from '../../src/values/constants';
import {useDispatch, useSelector} from 'react-redux';
import {deleteStaffByID} from '../../features/staff/staffSlice';
import moment from 'moment';
import ModalPopup from './ModalPopup';
import userApi from '../../api/userApi';
const UserItem = ({
  item,
  navigation,
  children,
  setId,
  setVisible,
  setVisibleRoleModal,
  setCheck,
  setUser,
}) => {
  const date = moment(item.updatedAt).format('DD/MM/YYYY hh:mm:ss');
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.users);
  const deleteItem = async () => {
    const res = await userApi.delete(item.user_uuid, token);
    if (res.data.data) {
      ToastAndroid.show(DELETE_SUCCESSFULLY, ToastAndroid.SHORT);
      setCheck(true);
    }
  };
  const handleDelete = () => {
    Alert.alert('Thông báo', 'Are u sure?', [
      {
        cancelable: true,
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: deleteItem},
    ]);
  };
  return (
    <View style={[styles.view, styles.flex_row]}>
      <View style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={styles.imgStaff}
          source={
            item.user_img !== null
              ? {
                  uri: item.user_img,
                }
              : require('../../src/images/staff.jpg')
          }
        />
      </View>

      {/* Name, position */}
      <View
        style={{
          flex: 2,
          marginLeft: 20,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View style={styles.flex_row}>
          <Text style={styles.title1}>Họ tên: </Text>
          <Text style={styles.content1}>{item.user_name}</Text>
        </View>
        <View style={styles.flex_row}>
          <Text style={styles.title1}>Vai trò: </Text>
          <Text style={styles.content1}>
            {Object.values(ROLE[item.user_role])}
          </Text>
        </View>
        <View style={styles.flex_row}>
          <Text style={styles.title1}>Cập nhật: </Text>
          <Text style={styles.content1}>{date}</Text>
        </View>
      </View>
      <View style={{flex: 0.15}}>
        <Menu>
          <MenuTrigger>
            <Icon name="dots-vertical" size={25} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              text={'Xem chi tiết'}
              onSelect={() => {
                setId(item.user_uuid);
                setVisible(true);
                setUser(item);
              }}
            />
            <MenuOption
              disabled={
                item.user_role === 0 || item.user_role === 2 ? true : false
              }
              text={'Thay đổi vai trò'}
              onSelect={() => {
                setId(item.user_uuid);
                setVisibleRoleModal(true);
                setUser(item && item);
              }}
            />
            <MenuOption
              disabled={
                item.user_role === 0 || item.user_role === 2 ? true : false
              }
              onSelect={handleDelete}
              text={STAFF_DELETE}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default UserItem;
