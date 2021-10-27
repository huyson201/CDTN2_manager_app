import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TaskHome from "./components/TaskScreen/TaskHome";
import TaskLogin from "./components/TaskScreen/TaskLogin";
import { MenuProvider } from "react-native-popup-menu";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import {isJwtExpired} from 'jwt-check-expiration';
const App = () => {
  const dispatch = useDispatch();
  const rememberMe = useSelector(state => state.users.isRemembered);
  useEffect(() => {
    const getData = async () => {
      try {
        await AsyncStorage.getItem('refresh_token').then(value => {
          if (value != null && isJwtExpired(value) == false) {
            const user = jwtDecode(value);
            dispatch(login(user));
          } else if (value != null && isJwtExpired(value) == true) {
            dispatch(logout());
          }
        });
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
        {rememberMe == false ? <TaskLogin /> : <TaskHome />}
          {/* <TaskHome /> */}
        </MenuProvider>
      </NavigationContainer>
    </View>
  );
};

export default App;
