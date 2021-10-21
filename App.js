import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TaskHome from "./components/TaskScreen/TaskHome";
import { MenuProvider } from "react-native-popup-menu";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <MenuProvider>
          <TaskHome />
        </MenuProvider>
      </NavigationContainer>
    </View>
  );
};

export default App;
