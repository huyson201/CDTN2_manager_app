import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async ({id, userToken}, thunkAPI) => {
    try {
      const res = await userApi.getUserById(id, userToken);
      return res.data.data;
    } catch (error) {
      console.log(error)
     resetToken(thunkAPI)
    }
  },
);
const resetToken = async(thunkAPI) =>{
  try {
    const refreshToken = thunkAPI.getState().users.refreshToken;
    const res = await userApi.refreshToken(refreshToken);
    await AsyncStorage.setItem('token', res.data.token);
    setAllToken({token: res.data.token});
  } catch (error) {
    console.log(error)
    thunkAPI.dispatch(logout);
  }

}
const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    refreshToken: null,
    token: null,
    isRemembered: false,
    firstLoading: true,
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
  },
  extraReducers: {
    [getUserById.pending]: state => {
      state.firstLoading = true;
    },
    [getUserById.rejected]: state => {
      state.firstLoading = false;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isRemembered = true;
      state.firstLoading = false;
    },
  },
});

export const {
  login,
  logout,
  setRememberMe,
  setFirstLoading,
  setAllToken,
  setUserInfo,
} = userSlice.actions;
export default userSlice.reducer;
