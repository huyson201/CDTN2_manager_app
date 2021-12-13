import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, ToastAndroid, TextInput, ScrollView, Image,StyleSheet,TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import userApi from '../api/userApi';
import {hotelSelectors, getHotelsOfUser} from '../features/hotel/hotelSlice';
import { resetToken } from '../src/utilFunc';
import { BLUE1 } from '../src/values/color';
import {SIGNOUT_SUCCESSFULLY} from '../src/values/constants';
const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // const hotels = useSelector(hotelSelectors.selectAll);
  // const hotel = useSelector(state => hotelSelectors.selectById(state, 1));
  const {user} = useSelector(state => state.users);
  const handlePressEditUser = () => {
    // dispatch(setFile());
    navigation.navigate('EditProfileScreen');
  };
  const ItemButtonView = () => {
    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        <View style={[ProfileStyles.funtionBtnItem, {backgroundColor: "orange"}]}>
          <TouchableOpacity onPress={handlePressEditUser}>
            <Text>
              <Icon
                style={ProfileStyles.icon}
                name="user-edit"
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
    <ScrollView>
    {/* HEADER */}
    {user !== null ? (
      <>
        <View style={ProfileStyles.header}>
          <View style={ProfileStyles.headerUserCicle}>
            <Image
              style={ProfileStyles.userImg}
              source={
                user.user_img !== null
                  ? {uri: user.user_img}
                  : {
                      uri: `https://ui-avatars.com/api/?name=${user.user_name}&size=256`,
                    }
              }
            />
          </View>
        </View>
        <Container>
          {/* EDIT BASIC INFORMATION */}
          <Text style={ProfileStyles.textTitle}>Full Name</Text>
          <View style={ProfileStyles.action}>
            <Icon
              style={ProfileStyles.icon}
              name="user-alt"
              size={18}
              backgroundColor="#05375a"
              color="#05375a"></Icon>
            <TextInput
              editable={false}
              defaultValue={user && user.user_name}
              placeholder="Type Your Name Here"
              autoCapitalize="none"
              style={ProfileStyles.textInput}></TextInput>
          </View>
          <Text style={ProfileStyles.textTitle}>Phone</Text>
          <View style={ProfileStyles.action}>
            <Icon
              style={ProfileStyles.icon}
              name="phone-alt"
              size={18}
              backgroundColor="#05375a"
              color="#05375a"></Icon>
            <TextInput
              editable={false}
              defaultValue={user && user.user_phone}
              placeholder="Type Your Phone Here"
              autoCapitalize="none"
              style={ProfileStyles.textInput}></TextInput>
          </View>
          {/* Email  */}
          <Text style={ProfileStyles.textTitle}>Email</Text>
          <View style={ProfileStyles.action}>
            <Icon1
              style={ProfileStyles.icon}
              name="mail"
              size={18}
              backgroundColor="#05375a"
              color="#05375a"
            />
            <TextInput
              editable={false}
              defaultValue={user && user.user_email}
              autoCapitalize="none"
              style={ProfileStyles.textInput}></TextInput>
          </View>
          {/* BTN Function */}
          <View Style={ProfileStyles.funtionBtn}>
            <ItemButtonView />
          </View>
        </Container>
      </>
    ) : (
      <Text></Text>
    )}
  </ScrollView>
  );
};

const Container = styled.View`
  padding: 0 15px;
  width: 100%;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:70
  },
});
const ProfileStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
  header: {
    backgroundColor: BLUE1,
    paddingTop: 10,
    paddingBottom: 25,
    color: '#fff',
    height:200,
    display:'flex',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent:'center'
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
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
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  icon: {
    paddingTop: 13,
    paddingRight: 15,
  },
  textTitle: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 5,
  },
  textInput: {
    color: '#000',
  },
  funtionBtn: {
    // Action
    paddingLeft: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#ade5ff',
    borderRadius: 40,
    //
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '33%',
  },
  funtionBtnItem: {
    marginTop: 60,
    flex: 1,
    margin: 5,
    // backgroundColor: '',
    padding: 18,
    alignItems: 'center',
    borderRadius: 150,
    borderWidth: 5,
    borderColor: "#FFF",
  },
  action: {
    paddingLeft: 20,
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#ade5ff',
    borderRadius: 40,
    // overflow: "hidden",
  },
});
export default ProfileScreen;
