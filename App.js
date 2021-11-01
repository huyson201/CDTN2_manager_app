
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TaskHome from "./components/TaskScreen/TaskHome";
import TaskLogin from "./components/TaskScreen/TaskLogin";
import { MenuProvider } from "react-native-popup-menu";

import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import {isJwtExpired} from 'jwt-check-expiration';
import SplashScreen from "./screens/SplashScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { login } from "./features/auth/userSlice";
const Stack = createNativeStackNavigator();
const App = () => {
  const dispatch = useDispatch();
  const rememberMe = useSelector(state => state.users.isRemembered);
  const [firstLoading, setFirstLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const refresh_token = await AsyncStorage.getItem('refresh_token');
        if (refresh_token != null && isJwtExpired(refresh_token) == false) {
          const token = await AsyncStorage.getItem('token');
          const user = jwtDecode(token);
          dispatch(login(user));
        } else if (
          refresh_token != null &&
          isJwtExpired(refresh_token) == true
        ) {
          dispatch(setRememberMe(false));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
 // set loading
  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 3000);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <MenuProvider>
        {firstLoading ? (
          <Stack.Navigator>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        ) : rememberMe === true ? (
          <TaskHome />
        ) : (
          <TaskLogin />
        )}
        </MenuProvider>
      </NavigationContainer>
    </View>
  );
};

export default App;
