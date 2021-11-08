import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TaskHome from './components/TaskScreen/TaskHome';
import TaskLogin from './components/TaskScreen/TaskLogin';
import { MenuProvider } from 'react-native-popup-menu';

import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { isJwtExpired } from 'jwt-check-expiration';
import SplashScreen from './screens/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  getUserById,
  login,
  logout,
  setAllToken,
  setFirstLoading,
} from './features/auth/userSlice';
import userApi from './api/userApi';

const Stack = createNativeStackNavigator();
const App = () => {
  const dispatch = useDispatch();
  const { isRemembered, firstLoading } = useSelector(state => state.users);
  useEffect(() => {
    const getData = async () => {
      try {
        const refresh_token = await AsyncStorage.getItem('refresh_token');
        if (refresh_token !== null && isJwtExpired(refresh_token) == false) {
          const token = await AsyncStorage.getItem('token');
          console.log(token);
          const user = jwtDecode(token);
          dispatch(getUserById({id: user.user_uuid, userToken: token}));
          dispatch(setAllToken({token: token, refreshToken: refresh_token}));
        } else if (
          refresh_token !== null &&
          isJwtExpired(refresh_token) === true
        ) {
          dispatch(logout());
        } else if (refresh_token === null)
          setTimeout(() => {
            dispatch(setFirstLoading(false));
          }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
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
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : isRemembered === true ? (
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
