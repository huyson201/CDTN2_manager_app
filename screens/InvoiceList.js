import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import InvoiceItem from '../components/invoices/InvoiceItem';
import {useIsFocused} from '@react-navigation/native';
import invoiceApi from '../api/invoiceApi';
import {useDispatch, useSelector} from 'react-redux';
import {setCheck} from '../features/invoice/invoiceSlice';
import Loading from '../components/Loading';

const InvoiceList = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [invoices, setInvoices] = useState();
  const check = useSelector(state => state.invoice.check);
  const dispatch = useDispatch();
  const {selectedHotel} = useSelector(state => state.hotels);
  const hotelId = selectedHotel;
  console.log(hotelId);

  const getAllInvoices = async params => {
    try {
      const res = await invoiceApi.getAll(params);
      console.log(res)
      if (res.data.data) {
        setInvoices(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInvoicesByStatus = async (hotelId, status) => {
    try {
      const res = await invoiceApi.getInvoiceByStatus(status, hotelId);
      console.log(res)
      if (res.data.data) {
        setInvoices(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused || check) {
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
      {invoices && invoices !== [] ? (
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
