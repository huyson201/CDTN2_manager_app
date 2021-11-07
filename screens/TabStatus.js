import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen';
import InvoiceList from './InvoiceList';
import {
  WAIT_COMFIRM,
  COMFIRM,
  COMFIRMED,
  NOT_DEPOSIT,
  DEPOSITED,
  CANCELED,
  DONE,
  ALL,
} from '../src/values/constants';
const Tab = createMaterialTopTabNavigator();

const TabStatus = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarItemStyle: {width: 120},
          tabBarScrollEnabled: true,
          swipeEnabled: false,
          tabBarPressColor: 'white',
        }}>
        <Tab.Screen name={ALL} component={InvoiceList} />
        <Tab.Screen name={WAIT_COMFIRM} component={InvoiceList} />
        <Tab.Screen name={NOT_DEPOSIT} component={InvoiceList} />
        <Tab.Screen name={DEPOSITED} component={InvoiceList} />
      </Tab.Navigator>
    </>
  );
};

export default TabStatus;
