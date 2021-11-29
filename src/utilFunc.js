import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import userApi from '../api/userApi';
import {logout, setUserInfo} from '../features/auth/userSlice';

export const resetToken = async (dispatch, refreshToken) => {
  try {
    const resToken = await userApi.refreshToken(refreshToken);
    const user = await jwtDecode(resToken.data.token);
    const res = await userApi.getUserById(user.user_uuid, resToken.data.token);
    dispatch(setUserInfo({user: res.data.data, token: resToken.data.token}));
    AsyncStorage.setItem('token', resToken.data.token);
    return resToken.data.token;
  } catch (error) {
    console.log(error)
    dispatch(logout());
  }
};
export const formatCurrency = (n, currency) => {
  return (
    currency +
    " " +
    n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
  ).slice(0, -2);
};
