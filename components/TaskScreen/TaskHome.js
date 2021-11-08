import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Invoice from '../../screens/Invoice';
import TabStatus from '../../screens/TabStatus';
import HomeScreen from '../../screens/HomeScreen';
import StaffList from '../../screens/StaffList';
import AddNewStaff from '../../screens/AddNewStaff';
import ListRoomsScreen from '../../screens/ListRoomsScreen';
import ListRoomsByTypeScreen from '../../screens/ListRoomsByTypeScreen';
import AddNewRoomScreen from '../../screens/AddNewRoomScreen';
import ListRoomsTypeStatusAvailalbeScreen from '../../screens/ListRoomsTypeStatusAvailalbeScreen';
import ListRoomsTypeStatusMaintainScreen from '../../screens/ListRoomsTypeStatusMaintainScreen';
import ListRoomsTypeStatusOrderedScreen from '../../screens/ListRoomsTypeStatusOrderedScreen';

const Stack = createNativeStackNavigator();

const TaskHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TabStatus"
        component={TabStatus}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="StaffList"
        component={StaffList}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="AddNewStaff"
        component={AddNewStaff}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="All Rooms"
        component={ListRoomsScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Type Rooms"
        component={ListRoomsByTypeScreen}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="Rooms Available"
        component={ListRoomsTypeStatusAvailalbeScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Rooms Maintaining"
        component={ListRoomsTypeStatusMaintainScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Rooms Ordered"
        component={ListRoomsTypeStatusOrderedScreen}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="Add A new Room"
        component={AddNewRoomScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default TaskHome;
