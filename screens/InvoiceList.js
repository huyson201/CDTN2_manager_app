import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import InvoiceItem from '../components/invoices/InvoiceItem';
import {useIsFocused} from '@react-navigation/native';
import invoiceApi from '../api/invoiceApi';
import {useDispatch, useSelector} from 'react-redux';
import {setCheck} from '../features/invoice/invoiceSlice';
import Loading from '../components/Loading';
import hotelApi from '../api/hotelApi';
import userApi from '../api/userApi';

const InvoiceList = ({navigation, route}) => {
  //hotel name rd pd quantity room name room info user info price status invoice
  const isFocused = useIsFocused();
  const [invoices, setInvoices] = useState();
  const check = useSelector(state => state.invoice.check);
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.users);
  const {selectedHotel} = useSelector(state => state.hotels);
  const hotelId = selectedHotel;
  const getRoom = async id => {
    try {
      const res = await hotelApi.getRoomById(id);
      if (res.data.data) {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserInfo = async id => {
    try {
      const res = await userApi.getUserById(id, token);
      if (res.data.data) {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setValue = async data => {
    for (let index = 0; index < data.length; index++) {
      const e = data[index];
      let roomInfo = await getRoom(e.room_id);
      let userInfo = await getUserInfo(e.user_uuid);
      const res = await Promise.all([roomInfo, userInfo]);
      // e.invoiceCreatedAt=e.createdAt
      const room = {
        room_name: res[0].room_name,
        room_beds: res[0].room_beds,
        room_people: res[0].room_num_people,
        room_quantity: res[0].room_quantity,
      };
      e.roomInfo = room;
      const user = {
        user_name: res[1].user_name,
        user_phone: res[1].user_phone,
        user_email: res[1].user_email,
        user_role: res[1].user_role
      };
      e.userInfo = user;
    }
    console.log(data,"data invoices");
    setInvoices(data);
  };
  const getAllInvoices = async params => {
    try {
      const res = await invoiceApi.getAll(params);
      if (res.data.data) {
        setValue(res.data.data);
       
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInvoicesByStatus = async (hotelId, status) => {
    try {
      const res = await invoiceApi.getInvoiceByStatus(status, hotelId);
      if (res.data.data) {
        setValue(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused ||isFocused && check) {
      if (route.params.param === -1) {
        getAllInvoices(hotelId);
      } else {
        getAllInvoicesByStatus(hotelId, route.params.param);
      }
    }
    return () => {
      setInvoices();
      dispatch(setCheck(false));
    };
  }, [isFocused, check]);
  return (
    <>
      {invoices && invoices!== [] ? (
        <>
          <FlatList
            data={invoices}
            renderItem={({item}) => {
              return (
                <View style={{backgroundColor: '#ececec'}}>
                  <InvoiceItem
                    key={item}
                    data={item}
                    hotelId={hotelId}
                    navigation={navigation}
                  />
                </View>
              );
            }}
          />
        </>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
};

export default InvoiceList;
