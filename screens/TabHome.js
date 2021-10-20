import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen';
const Tab = createMaterialTopTabNavigator();

const TabHome = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Home2" component={HomeScreen} />
        <Tab.Screen name="Home3" component={HomeScreen} />
        <Tab.Screen name="Home4" component={HomeScreen} />
        {/* <Tab.Screen name="Settings" component={Notif} /> */}
      </Tab.Navigator>
    </>
  );
};

export default TabHome;
