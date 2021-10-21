import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Invoice from "../../screens/Invoice";
import TabStatus from "../../screens/TabStatus";

const Stack = createNativeStackNavigator();

const TaskHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabStatus"
        component={TabStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TaskHome;
