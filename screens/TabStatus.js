import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./HomeScreen";
import InvoiceList from "./InvoiceList";
import {
  WAIT_COMFIRM,
  COMFIRM,
  COMFIRMED,
  NOT_DEPOSIT,
  DEPOSITED,
  CANCELED,
  DONE,
} from "../src/values/constants";
import { ScrollView, StyleSheet } from "react-native";
const Tab = createMaterialTopTabNavigator();

const TabStatus = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="tất cả" component={InvoiceList} />
        <Tab.Screen name={WAIT_COMFIRM} component={InvoiceList} />
        <Tab.Screen name={NOT_DEPOSIT} component={InvoiceList} />
        <Tab.Screen name={DEPOSITED} component={InvoiceList} />
      </Tab.Navigator>
    </>
  );
};

export default TabStatus;
