import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WHITE} from '../../src/values/color';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  ROLE,
  STAFF_POSITION,
  STAFF_EDIT,
  STAFF_DELETE,
} from '../../src/values/constants';

const StaffItem = ({item}) => {
    const handleDeleteStaff = () =>{
        
    }
  return (
    <View style={[styles.view, styles.flex_row]}>
      {/* Image */}
      <View style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={styles.imgStaff}
          source={require('../../src/images/staff.jpg')}
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
          <Text style={styles.title1}>Name: </Text>
          <Text style={styles.content1}>{item.staff_info.user_name}</Text>
        </View>
        <View style={styles.flex_row}>
          <Text style={styles.title1}>Position: </Text>
          <Text style={styles.content1}>{Object.values(ROLE[item.role])}</Text>
        </View>
      </View>

      <Menu style={{flex: 0.2}}>
        <MenuTrigger>
          <Icon name="dots-vertical" size={25} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption text={STAFF_EDIT} />
          <MenuOption onSelect={() => alert('Xóa')} text={STAFF_DELETE} />
        </MenuOptions>
      </Menu>
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

export default StaffItem;
