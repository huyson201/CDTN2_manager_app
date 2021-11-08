import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {WHITE, BLUE1, BLUE2} from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import StaffItem from '../components/staff/StaffItem';
import staffApi from '../api/staffApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getStaff, staffSelectors} from '../features/staff/staffSlice';
import {useIsFocused} from '@react-navigation/native';
const StaffList = ({navigation}) => {
  const flatList = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const staffs = useSelector(staffSelectors.selectAll);
  const {check, loading} = useSelector(state => state.staffs);
  const [reverseList, setReverseList] = useState([]);
  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    dispatch(getStaff({id: 1, token: token}));
  }, []);
  // useEffect(() => {
  //   if (staffs.length > 0) {
  //     setReverseList(staffs.reverse());
  //   }
  //   return () => {};
  // }, [staffs.length]);
  useEffect(() => {
    if (!check && isFocused == true && staffs.length > 0) {
      flatList.current?.scrollToEnd();
    }
  }, [isFocused, staffs.length]);
  const handlePressAdd = () => {
    navigation.navigate('AddNewStaff');
  };
  return (
    <View style={styles.container}>
      {staffs.length > 0 && (
        <FlatList
          ref={flatList}
          data={staffs}
          renderItem={({item}) => {
            return (
              <View style={{backgroundColor: '#ececec'}}>
                <StaffItem navigation={navigation} key={item} item={item} status={1} />
              </View>
            );
          }}
        />
      )}
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
});

export default StaffList;
