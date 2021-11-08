import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InvoiceList from './InvoiceList';
import {
  WAIT_COMFIRM,
  NOT_DEPOSIT,
  DEPOSITED,
  ALL,
  RECEIVED,
  DONE,
  CANCELED,
} from '../src/values/constants';
import { useIsFocused } from '@react-navigation/core';
const Tab = createMaterialTopTabNavigator();

const TabStatus = () => {

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 150 },
          tabBarScrollEnabled: true,
          swipeEnabled: false,
          tabBarPressColor: 'white',
          lazy: true
        }}>
        <Tab.Screen name={ALL} initialParams={{param:-1}} component={InvoiceList} />
        <Tab.Screen name={WAIT_COMFIRM} initialParams={{param:0}} component={InvoiceList} />
        <Tab.Screen name={NOT_DEPOSIT} initialParams={{param:1}} component={InvoiceList} />
        <Tab.Screen name={DEPOSITED} initialParams={{param:2}} component={InvoiceList} />
        <Tab.Screen name={RECEIVED} initialParams={{param:3}} component={InvoiceList} />
        <Tab.Screen name={DONE} initialParams={{param:4}} component={InvoiceList} />
        <Tab.Screen name={CANCELED} initialParams={{param:5}} component={InvoiceList} />
      </Tab.Navigator>
    </>
  );
};

export default TabStatus;
