import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {isJwtExpired} from 'jwt-check-expiration';
import {ToastAndroid} from 'react-native';
import staffApi from '../../api/staffApi';
import {EXPIRED_TOKEN} from '../../src/values/constants';
import {logout} from '../auth/userSlice';
import {resetToken} from '../../src/utilFunc';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getStaff = createAsyncThunk(
  'staffs/get',
  async ({id, token}, thunkAPI) => {
    try {
      const res = await staffApi.getStaffByHotelId(id, token);
      return res.data.data;
    } catch (error) {
      console.log(error);
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const token = await AsyncStorage.getItem('token');
      console.log(token, 'OLD');
      const newToken = await resetToken(thunkAPI.dispatch, refreshToken);
      console.log(newToken, 'NEW');
      const res = await staffApi.getStaffByHotelId(id, newToken);
      return res.data.data;
    }
  },
);
export const createStaff = createAsyncThunk(
  'staffs/create',
  async ({name, email, phone, staffRole, hotelId, token}, thunkAPI) => {
    try {
      const res = await staffApi.createStaff(
        name,
        email,
        phone,
        staffRole,
        hotelId,
        token,
      );
      const data = res.data.data;
      data.staff_info = {
        user_email: email,
        user_name: name,
        user_phone: phone,
        user_uuid: res.data.data.user_uuid,
        user_img: null,
      };
      return data;
    } catch (error) {
      console.log(error);
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      // const token = await AsyncStorage.getItem('token')
      // console.log(token,"OLD")
      const newToken = await resetToken(thunkAPI.dispatch, refreshToken);
      // console.log(newToken,"NEW")
      const res = await staffApi.createStaff(
        name,
        email,
        phone,
        staffRole,
        hotelId,
        newToken,
      );
      const data = res.data.data;
      data.staff_info = {
        user_email: email,
        user_name: name,
        user_phone: phone,
        user_uuid: res.data.data.user_uuid,
        user_img: null,
      };
      return data;
    }
  },
);
export const updateStaffById = createAsyncThunk(
  'staffs/updateById',
  async ({id, role, token}, thunkAPI) => {
    try {
      await staffApi.updateStaff(id, role, token);

      return {id: id, changes: role};
    } catch (error) {
      console.log(error);
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const token = await AsyncStorage.getItem('token');
      if (isJwtExpired(token) == true) {
        const newToken = await resetToken(thunkAPI.dispatch, refreshToken);
        await staffApi.updateStaff(id, role, newToken);
        return {id: id, changes: role};
      } else {
        // getStaff()
        console.log('loi');
      }
    }
  },
);
export const deleteStaffByID = createAsyncThunk(
  'staffs/deleteStaffByID',
  async ({id, token}, thunkAPI) => {
    try {
      await staffApi.deleteStaffById(id, token);
      return id;
    } catch (error) {
      console.log(error);
    }
  },
);

const staffAdapter = createEntityAdapter({
  selectId: staff => staff.staff_id,
});
export const staffSelectors = staffAdapter.getSelectors(state => state.staffs);
const staffSlice = createSlice({
  name: 'staffs',
  initialState: staffAdapter.getInitialState({
    loading: null,
    check: false,
    checkUpdated: false,
  }),
  reducers: {
    setCheck(state, {payload}) {
      state.check = payload;
    },
    removeStaffList(state) {
      staffAdapter.removeAll(state);
    },
  },
  extraReducers: {
    [getStaff.pending](state) {
      state.loading = true;
    },
    [getStaff.fulfilled](state, action) {
      state.loading = false;
      staffAdapter.setAll(state, action.payload);
    },
    [getStaff.rejected](state) {
      state.loading = false;
    },
    [createStaff.pending](state) {
      state.loading = true;
    },
    [createStaff.rejected](state) {
      state.loading = false;
    },
    [createStaff.fulfilled](state, {payload}) {
      state.loading = false;
      state.check = false;
      staffAdapter.addOne(state, payload);
    },
    [deleteStaffByID.pending](state) {
      state.loading = true;
    },
    [deleteStaffByID.rejected](state) {
      state.loading = false;
    },
    [deleteStaffByID.fulfilled](state, {payload}) {
      state.loading = false;
      state.check = true;
      staffAdapter.removeOne(state, payload);
    },
    [updateStaffById.pending](state) {
      state.loading = true;
    },
    [updateStaffById.rejected](state) {
      state.loading = false;
    },
    [updateStaffById.fulfilled](state, {payload}) {
      state.loading = false;
      state.checkUpdated = true;
      state.check = true;
      staffAdapter.updateOne(state, {
        id: payload.id,
        changes: {role: payload.changes},
      });
    },
  },
});

export const {setCheck, removeStaffList} = staffSlice.actions;
export default staffSlice.reducer;
