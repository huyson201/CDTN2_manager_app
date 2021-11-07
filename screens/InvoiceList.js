import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import InvoiceItem from '../components/invoices/InvoiceItem';
import {useIsFocused} from '@react-navigation/native';
const InvoiceList = ({navigation,route}) => {
  const data = [1, 2, 3, 4, 5, 6];
  const isFocused = useIsFocused();
  if (isFocused) {
    console.log(route.name)
  }
  return (
    <>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <View style={{backgroundColor: '#ececec'}}>
              <InvoiceItem
                key={item}
                roomName={'deluxe room'}
                status={1}
                navigation={navigation}
              />
            </View>
          );
        }}
      />
    </>
  );
};

export default InvoiceList;
