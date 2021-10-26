import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TaskHome from "./components/TaskScreen/TaskHome";
import { MenuProvider } from "react-native-popup-menu";
import StaffList from "./screens/StaffList";

const App = () => {
  return (
    // <View style={{ flex: 1 }}>
    //   <NavigationContainer>
    //     <MenuProvider>
    //       <TaskHome />
    //     </MenuProvider>
    //   </NavigationContainer>
    // </View>

    <SafeAreaView style={{ flex: 1 }}>
      <StaffList />
    </SafeAreaView>
  );
};

export default App;
