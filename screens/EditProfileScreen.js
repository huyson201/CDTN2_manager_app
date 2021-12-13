import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLUE1, BLUE2} from '../src/values/color';
import {Button} from 'react-native-elements';
import {TextInput, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import userApi from '../api/userApi';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {
  setUserInfo,
  setCheckPickerImage,
  setFile,
} from '../features/auth/userSlice';
import {useToast} from 'react-native-toast-notifications';
import DialogEditImage from '../components/user/DialogEditImage';
const EditProfileScreen = function ({navigation}) {
  const toast = useToast();
  const {token, checkPickerImage, file} = useSelector(
    state => state.users,
  );
  const currentUser = useSelector(state => state.users.user);
  const [user_name, setUserName] = useState(currentUser.user_name);
  const [user_phone, setUserPhone] = useState(currentUser.user_phone);
  const dispatch = useDispatch();
  const handlePressUserProfile = () => {
    // dispatch(setFile());
    navigation.goBack();
  };

  const handlePressEditUserProfile = async () => {
    let formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('user_phone', user_phone);

    if (file) {
      formData.append('avatar', file);
      console.log('from data', formData);
    }

    try {
      const res = await userApi.update(token, currentUser.user_uuid, formData);
      if (res.data.data) {
        toast.show('Cập nhật thành công', {
          type: 'success',
          placement: 'top',
          duration: 2000,
          offset: 0,
          animationType: 'slide-in',
        });
        dispatch(setUserInfo({user:res.data.data}));
        dispatch(setFile(null));
      }
    } catch (error) {
      console.log(error, 'error update');
    }
  };
  const uploadImage = () => {
    dispatch(setCheckPickerImage(true));
  };

  const renderFileData = () => {
    if (file) {
      return (
        <Image style={EditProfileStyles.userImg} source={{uri: file.uri}} />
      );
    } else {
      return (
        <Image
          style={EditProfileStyles.userImg}
          source={
            currentUser.user_img !== null
              ? {uri: currentUser.user_img}
              : {
                  uri: `https://ui-avatars.com/api/?name=${currentUser.user_name}&size=256`,
                }
          }
        />
      );
    }
  };

  return (
    <>
      <DialogEditImage visible={checkPickerImage} />
      <ScrollView>
        {/* HEADER */}
        <View style={EditProfileStyles.header}>
          <TouchableOpacity activeOpacity={0.9} onPress={uploadImage}>
            <View style={EditProfileStyles.headerUserCicle}>
              {renderFileData()}
              <Icon
                name="camera"
                style={{
                  fontSize: 25,
                  position: 'absolute',
                  right: -12,
                  bottom: -12,
                  color: {BLUE2},
                  zIndex: 999,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Container>
          {/* EDIT BASIC INFORMATION */}
          <Text style={EditProfileStyles.textTitle}>Full Name</Text>
          <View style={EditProfileStyles.action}>
            <Icon
              style={EditProfileStyles.icon}
              name="user-alt"
              size={18}
              backgroundColor="#05375a"
              color="#05375a"></Icon>
            <TextInput
              defaultValue={currentUser ? currentUser.user_name : ''}
              autoCapitalize="none"
              style={EditProfileStyles.textInput}
              onChangeText={val => (val ? setUserName(val) : '')}></TextInput>
          </View>
          <Text style={EditProfileStyles.textTitle}>Phone</Text>
          <View style={EditProfileStyles.action}>
            <Icon
              style={EditProfileStyles.icon}
              name="phone-alt"
              size={18}
              backgroundColor="#05375a"
              color="#05375a"></Icon>
            <TextInput
              defaultValue={currentUser ? currentUser.user_phone : ''}
              autoCapitalize="none"
              style={EditProfileStyles.textInput}
              onChangeText={val => (val ? setUserPhone(val) : '')}></TextInput>
          </View>
          <View style={EditProfileStyles.btn}>
            <Button
              onPress={handlePressEditUserProfile}
              title="UPDATE"
              buttonStyle={EditProfileStyles.okBtn}></Button>
            <Button
              title="Cancel"
              onPress={handlePressUserProfile}
              buttonStyle={EditProfileStyles.cancelBtn}></Button>
          </View>
        </Container>
      </ScrollView>
    </>
  );
};

const Container = styled.View`
  padding: 0 15px;
  width: 100%;
`;

const EditProfileStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
  header: {
    backgroundColor: BLUE1,
    paddingTop: 10,
    paddingBottom: 25,
    color: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height:200,
    display:'flex',
    justifyContent:'center'
  },
  headerUserCicle: {
    // display: 'flex',
    position: 'relative',
    paddingBottom: 50,
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

  textInput: {
    color: '#000',
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
  box: {
    height: 40,
    marginTop: 10,
    backgroundColor: '#ade5ff',
    textTransform: 'capitalize',
    borderRadius: 8,
    paddingLeft: 32,
    paddingRight: 32,
  },
  PickerStyle: {
    height: 50,
    width: 150,
    borderRadius: 50,
    backgroundColor: '#ade5ff',
    color: '#20232a',
    textAlign: 'center',
    //  Add Action Style
    paddingLeft: 20,
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    // backgroundColor: '#ade5ff',
    borderRadius: 40,
  },
  Picker: {
    height: 50,
    width: 150,
    borderWidth: 1,
    backgroundColor: '#ade5ff',
  },
  genderPicker: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    overflow: 'hidden',
  },
  btn: {
    marginTop: 50,
    justifyContent: 'center',
    minWidth: '100%',
  },
  cancelBtn: {
    marginTop: 10,
    backgroundColor: '#cfcfcf',
    borderRadius: 40,
  },
  okBtn: {
    marginTop: 10,
    borderRadius: 40,
  },
  action: {
    paddingLeft: 20,
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#ade5ff',
    borderRadius: 40,
  },
});

export default EditProfileScreen;
