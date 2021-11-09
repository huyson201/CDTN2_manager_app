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
import {WHITE, BLUE1, BLUE2} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {hotelSelectors} from '../features/hotel/hotelSlice';
import {
  createStaff,
  staffSelectors,
  updateStaffById,
} from '../features/staff/staffSlice';
import {Formik} from 'formik';
import {Button} from 'react-native-elements';
import * as Yup from 'yup';
import {EDIT_SUCCESSFULLY, ADD_SUCCESSFULLY} from '../src/values/constants';
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
const AddNewStaff = ({navigation, route}) => {
  const hotel = useSelector(state => hotelSelectors.selectById(state, 1));
  const [id, setId] = useState();
  const {token} = useSelector(state => state.users);
  const {loading} = useSelector(state => state.staffs);
  const dispatch = useDispatch();
  const [firstTime, setFirstTime] = useState(false);
  const user = {name: '', email: '', phone: ''};
  useEffect(() => {
    if (route.params != undefined) {
      setId(route.params['id']);
      navigation.setOptions({
        title: `Edit Staff`,
      });
    } else {
      navigation.setOptions({
        title: `Add Staff`,
      });
    }
    return () => {
      setId();
    };
  }, [route.params]);
  const staff = useSelector(state => staffSelectors.selectById(state, id));
  const [selectedPosition, setSelectedPosition] = useState();
  return (
    <>
      {!staff && null}
      {(staff || route.params == undefined) && (
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={(values, formikActions) => {
            if (staff) {
              dispatch(
                updateStaffById({id: id, role: selectedPosition, token: token}),
              );
              loading == false &&
                ToastAndroid.show(EDIT_SUCCESSFULLY, ToastAndroid.SHORT);
            } else {
              dispatch(
                createStaff({
                  name: values.name,
                  email: values.email,
                  phone: values.phone,
                  staffRole: selectedPosition,
                  hotelId: hotel.hotel_id,
                  token: token,
                }),
              );
              loading == false &&
                ToastAndroid.show(ADD_SUCCESSFULLY, ToastAndroid.SHORT);
              formikActions.resetForm();
            }
          }}>
          {({
            values,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setValues,
            errors,
          }) => {
            useEffect(() => {
              if (staff) {
                setValues({
                  name: staff.staff_info.user_name,
                  email: staff.staff_info.user_email,
                  phone: staff.staff_info.user_phone,
                });
              }
            }, [staff]);
            return (
              <View>
                <View style={styles.header}>
                  <TouchableOpacity>
                    <Image
                      source={
                        staff
                          ? staff.staff_info.user_img !== null
                            ? {
                                uri: staff.staff_info.user_img,
                              }
                            : require('../src/images/staff.jpg')
                          : require('../src/images/staff.jpg')
                      }
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

                      editable={staff ? false : true}
                      value={values.name}
                      onBlur={handleBlur('name')}
                      onChangeText={handleChange('name')}
                      placeholder="Input Your Name"
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
                      editable={staff ? false : true}
                      placeholder="Input Your Email"
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
                      editable={staff ? false : true}
                      placeholder="Input Your Phone"
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
                    <Picker
                      selectedValue={selectedPosition}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        if (staff && !firstTime) {
                          setSelectedPosition(staff.role);
                          setFirstTime(true);
                        } else {
                          setSelectedPosition(itemValue);
                        }
                        if (firstTime) {
                          setSelectedPosition(itemValue);
                        }
                      }}>
                      <Picker.Item
                        label="Nhân viên"
                        value={0}
                        style={{fontSize: 17}}
                      />
                      <Picker.Item
                        label="Lễ Tân"
                        value={1}
                        style={{fontSize: 17}}
                      />
                    </Picker>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>

                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.text_button}>Cancel</Text>
                    </TouchableOpacity>
                    <Button
                      loading={loading}
                      onPress={handleSubmit}
                      buttonStyle={styles.button}
                      title={staff ? 'Edit' : 'Add'}></Button>
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      )}
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

export default AddNewStaff;
