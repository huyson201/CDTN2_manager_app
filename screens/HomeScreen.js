import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, ToastAndroid } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import userApi from "../api/userApi";
import { logout } from "../features/auth/userSlice";
import { SIGNOUT_SUCCESSFULLY } from "../src/values/constants";

const HomeScreen = () => {
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await userApi.logout(token);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refresh_token');
      dispatch(logout());
      ToastAndroid.show(SIGNOUT_SUCCESSFULLY, ToastAndroid.SHORT);
    } catch (e) {
      console.log(e)
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>HomeScreen</Text>
      <Button onPress={handleLogout} title={"Logout"} ></Button>
    </View>
  );
};

export default HomeScreen;
