import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    refreshToken: null,
    token: null,
    isRemembered: false,
    firstLoading: true,
    isAdmin : false,
    file: null,
    checkPickerImage: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isRemembered = true;
    },
    logout(state) {
      state.user = null;
      state.refreshToken = null;
      state.token = null;
      state.isRemembered = false;
      state.firstLoading = false;
    },
    setRememberMe(state, action) {
      state.isRemembered = action.payload;
    },
    setFirstLoading(state, action) {
      state.firstLoading = action.payload;
    },
    setAllToken(state, action) {
      state.token = action.payload.token;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
    setUserInfo(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setCheckPickerImage(state, action) {
      state.checkPickerImage = action.payload
    },
    setFile(state, action) {
      state.file = action.payload;
    },
  },
  extraReducers: {
  
  },
});

export const {
  login,
  logout,
  setRememberMe,
  setFirstLoading,
  setAllToken,
  setUserInfo,
  setCheckPickerImage,
  setFile
} = userSlice.actions;
export default userSlice.reducer;
