import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Invoice from '../../screens/Invoice';
import TabStatus from '../../screens/TabStatus';
import DashBoardScreen from '../../screens/DashBoardScreen';
import StaffList from '../../screens/StaffList';
import ListRoomsScreen from '../../screens/ListRoomsScreen';
import ListRoomsByTypeScreen from '../../screens/ListRoomsByTypeScreen';
import AddNewRoomScreen from '../../components/room/AddNewRoomScreen';
import ListRoomsTypeStatusAvailalbeScreen from '../../screens/ListRoomsTypeStatusAvailalbeScreen';
import ListRoomsTypeStatusMaintainScreen from '../../screens/ListRoomsTypeStatusMaintainScreen';
import ListRoomsTypeStatusOrderedScreen from '../../screens/ListRoomsTypeStatusOrderedScreen';
import CommissionScreen from '../../screens/CommissionScreen';
import HotelList from '../../screens/HotelList';
import {useSelector} from 'react-redux';
import AddHotel from '../hotel/AddHotel';
import EditHotel from '../hotel/EditHotel';
import UserList from '../../screens/UserList';
import AddNewUser from '../../screens/AddNewUser';
import EditRoom from '../../components/room/EditRoom';
const Stack = createNativeStackNavigator();

const TaskHome = () => {
  const {selectedHotel} = useSelector(state => state.hotels);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashBoard"
        component={DashBoardScreen}
        options={{
          headerShown: true,
          title: selectedHotel ? 'Quản lý khách sạn' : 'Home',
        }}
      />
      <Stack.Screen
        name="HotelList"
        component={HotelList}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="TabStatus"
        component={TabStatus}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="StaffList"
        component={StaffList}
        options={{headerShown: true,title:"Danh sách nhân viên"}}
      />

      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{headerShown: true,title:"Danh sách user"}}
      />
       <Stack.Screen
        name="AddNewUser"
        component={AddNewUser}
        options={{headerShown: true, title: "Thêm mới"}}
      />
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AllRooms"
        component={ListRoomsScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditRoom"
        component={EditRoom}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Status Type Rooms"
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

      <Stack.Screen
        name="AddHotel"
        component={AddHotel}
        options={{ headerShown: true, title: "Thêm khách sạn" }}
      />

      <Stack.Screen
        name="EditHotel"
        component={EditHotel}
        options={{ headerShown: true, title: "Chỉnh sửa khách sạn" }}
      />
    </Stack.Navigator>
  );
};

export default TaskHome;
