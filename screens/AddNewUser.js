import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import {WHITE, BLUE2} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import {Button} from 'react-native-elements';
import * as Yup from 'yup';
import {ADD_SUCCESSFULLY} from '../src/values/constants';
import userApi from '../api/userApi';
import staffApi from '../api/staffApi';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  email: Yup.string()
    .trim()
    .email('Invalid email!')
    .required('Email is required!'),
  phone: Yup.string().min(10, 'Invalid phone!').required('phone is required!'),
});
const AddNewUser = ({navigation, route}) => {
  const {selectedHotel} = useSelector(state => state.hotels);
  const {token} = useSelector(state => state.users);
  const [loading, setLoading] = useState(false);
  const user = {name: '', email: '', phone: ''};
  const createUser = async (name, email, phone, role, token) => {
    await userApi.create(name, email, phone, role, token);
  };
  const createStaff = async (name, email, phone, role, token) => {
    await staffApi.createStaff(name, email, phone, role, selectedHotel, token);
  };
  const [selectedPosition, setSelectedPosition] = useState(0);
  return (
    <>
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          setLoading(true);
          if (selectedHotel) {
            createStaff(
              values.name,
              values.email,
              values.phone,
              selectedPosition,
              token,
            );
          } else {
            createUser(
              values.name,
              values.email,
              values.phone,
              selectedPosition,
              token,
            );
          }

          setLoading(false);
          loading == false &&
            ToastAndroid.show(ADD_SUCCESSFULLY, ToastAndroid.SHORT);
          formikActions.resetForm();
        }}>
        {({
          values,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
        }) => {
          return (
            <View>
              <View style={styles.header}>
                <TouchableOpacity>
                  <Image
                    source={require('../src/images/staff.jpg')}
                    style={styles.imgStaff}
                    imageStyle={{
                      borderRadius: 99,
                      borderWidth: 1,
                      borderColor: WHITE,
                    }}></Image>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <View style={styles.flex_row}>
                  <Icon name="user" size={23} style={styles.icon} />
                  <TextInput
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChangeText={handleChange('name')}
                    placeholder="Nhập họ tên ..."
                    autoCapitalize="none"
                    style={{
                      fontSize: 17,
                      paddingLeft: 20,
                    }}
                  />
                </View>
                {errors.name && touched.name ? (
                  <Text
                    style={{color: 'red', marginLeft: 40, marginBottom: -20}}>
                    {errors.name}
                  </Text>
                ) : null}
                <View style={styles.flex_row}>
                  <Icon2 name="mail-outline" size={25} style={styles.icon} />
                  <TextInput
                    placeholder="Nhập email ..."
                    autoCapitalize="none"
                    style={{
                      fontSize: 17,
                      paddingLeft: 15,
                    }}
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                  />
                </View>
                {errors.email && touched.email ? (
                  <Text
                    style={{color: 'red', marginLeft: 40, marginBottom: -20}}>
                    {errors.email}
                  </Text>
                ) : null}
                <View style={styles.flex_row}>
                  <Icon2 name="contact-phone" size={23} style={styles.icon} />
                  <TextInput
                    placeholder="Nhập số điện thoại ..."
                    autoCapitalize="none"
                    style={{
                      fontSize: 17,
                      paddingLeft: 17,
                    }}
                    value={values.phone}
                    onBlur={handleBlur('phone')}
                    onChangeText={handleChange('phone')}
                  />
                </View>
                {errors.phone && touched.phone ? (
                  <Text
                    style={{color: 'red', marginLeft: 40, marginBottom: -20}}>
                    {errors.phone}
                  </Text>
                ) : null}
                <View style={styles.flex_row}>
                  <Icon2
                    name="location-history"
                    size={25}
                    style={styles.icon}
                  />
                  {selectedHotel ? (
                    <Picker
                      selectedValue={selectedPosition}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedPosition(itemValue);
                      }}>
                      <Picker.Item
                        label="Nhân viên"
                        value={0}
                        style={{fontSize: 17}}
                      />
                      <Picker.Item
                        label="Lễ tân"
                        value={1}
                        style={{fontSize: 17}}
                      />
                    </Picker>
                  ) : (
                    <Picker
                      selectedValue={selectedPosition}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedPosition(itemValue);
                      }}>
                      <Picker.Item
                        label="Admin"
                        value={0}
                        style={{fontSize: 17}}
                      />
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
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={styles.button}>
                    <Text style={styles.text_button}>Cancel</Text>
                  </TouchableOpacity>
                  <Button
                    loading={loading}
                    onPress={handleSubmit}
                    buttonStyle={styles.button}
                    title={'Thêm'}></Button>
                </View>
              </View>
            </View>
          );
        }}
      </Formik>
    </>
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
    marginTop: 50,
  },
  icon: {
    paddingTop: 13,
    color: BLUE2,
  },
  picker: {
    width: 290,
    height: 40,
  },
  text_button: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default AddNewUser;
