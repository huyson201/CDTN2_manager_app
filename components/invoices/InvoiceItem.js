import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  BLUE2,
  WHITE,
  LIGHT_GRAY,
  ORANGE,
  MAP_MARKER,
} from '../../src/values/color';
import Octicons from 'react-native-vector-icons/Octicons';
import {TOTAL, STATUS_INVOICE} from '../../src/values/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import hotelApi from '../../api/hotelApi';
import Menu from '../menu/MenuList';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {xoaDau} from '../../src/utilFunc';

const InvoiceItem = props => {
  const rDate = props.data.r_date.split('T')[0].replace(/-/g, '/');
  const pDate = props.data.p_date.split('T')[0].replace(/-/g, '/');
  const {user} = useSelector(state => state.users);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          props.navigation &&
            props.navigation.navigate('Invoice', {
              data: props.data,
              rDate: rDate,
              pDate: pDate,
            });
        }}>
        <View style={styles.view}>
          <View style={[styles.flex_row, styles.header]}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.padding, styles.roomName]}>
              {props.data.roomInfo.room_name}
            </Text>
            {props.data.status != 4 && props.data.status != 5 && (
              <Menu
                status={props.data.status}
                id={props.data.invoice_id}
                room_quantity={props.data.roomInfo.room_quantity}
              />
            )}
          </View>
          <View style={[styles.body, styles.padding, styles.flex_row]}>
            <View>
              <Text>Thời gian</Text>
              <Text style={styles.color_text}>
                {rDate} - {pDate}
              </Text>
            </View>

            {+props.data.status === 0 ? (
              <View style={[styles.flex_row, styles.padding_status]}>
                {props.data.roomInfo.room_quantity > 0 ? (
                  <>
                    <Icon
                      name="check"
                      size={14}
                      color="#05375a"
                      style={styles.icon}></Icon>
                    <Text style={styles.color_text}>Còn phòng</Text>
                  </>
                ) : (
                  <>
                    <Octicons
                      name="x"
                      size={14}
                      style={[styles.icon, styles.color_red]}></Octicons>
                    <Text style={{color: MAP_MARKER, fontSize: 12.5}}>
                      Hết phòng
                    </Text>
                  </>
                )}
              </View>
            ) : (
              <Text></Text>
            )}
          </View>
          <View style={[styles.footer, styles.padding, styles.flex_row]}>
            <Text>
              {`${TOTAL}`} :{props.data.price} VND
            </Text>
            <Text style={{color: ORANGE}}>
              {Object.values(STATUS_INVOICE[props.data.status])}
            </Text>
          </View>
          {/* <Text>
            Current Date: {xoaDau(moment(props.data.updatedAt).fromNow())}
          </Text> */}
        </View>
      </TouchableOpacity>
    </>
  );
};

// function getHoursInvoice(arr, status) {
//   if (arr[0] === 'mot' && arr[1] === 'ngay' && +status === +2) {
//   }
// }

const styles = StyleSheet.create({
  view: {
    margin: 5,
    backgroundColor: WHITE,
    borderRadius: 5,
    elevation: 3,
  },
  header: {
    backgroundColor: BLUE2,
  },
  body: {
    paddingBottom: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: LIGHT_GRAY,
  },
  footer: {
    paddingBottom: 12,
    paddingTop: 7,
    color: '#000',
  },
  flex_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  padding: {
    padding: 15,
  },
  padding_status: {
    paddingTop: 15,
  },
  color_text: {
    color: '#05375a',
    fontSize: 12.5,
  },
  color_red: {
    color: MAP_MARKER,
    fontSize: 14,
    marginRight: 5,
  },
  roomName: {
    width: 300,
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: WHITE,
  },

  icon_menu: {
    paddingLeft: 15,
    color: LIGHT_GRAY,
  },
  icon: {
    color: '#05375a',
    marginTop: 2,
    marginRight: 2,
  },
});

export default InvoiceItem;
