import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Invoice from "../../screens/Invoice";
import TabStatus from "../../screens/TabStatus";
import ListRoomsScreen from "../../screens/ListRoomsScreen";
import ListRoomsByTypeScreen from "../../screens/ListRoomsByTypeScreen";
import AddNewRoomScreen from "../../screens/AddNewRoomScreen";


const Stack = createNativeStackNavigator();

const TaskHome = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="TabStatus"
        component={TabStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{ headerShown: false }}
      /> */}
        {/* <Stack.Screen
        name="All Rooms"
        component={ListRoomsScreen}
        options={{ headerShown: true }}
      />
       <Stack.Screen
        name="Type Rooms"
        component={ListRoomsByTypeScreen}
        options={{ headerShown: true }}
      /> */}
  <Stack.Screen
        name="Add A new Room"
        component={AddNewRoomScreen}
        options={{ headerShown: true }}
      />
      
    </Stack.Navigator>
  );
};

export default TaskHome;
