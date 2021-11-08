import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
import staffApi from '../../api/staffApi';
import {EXPIRED_TOKEN} from '../../src/values/constants';
import {logout} from '../auth/userSlice';
export const getStaff = createAsyncThunk(
  'staffs/get',
  async ({id, token}, thunkAPI) => {
    try {
      const res = await staffApi.getStaffByHotelId(id, token);
      return res.data.data;
    } catch (error) {}
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
      console.log(data)
      data.staff_info = {
        user_email: email,
        user_name: name,
        user_phone: phone,
        user_uuid: res.data.data.user_uuid,
      };
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const updateStaffById = createAsyncThunk(
  'staffs/updateById',
  async ({id, role, token}, thunkAPI) => {
    try {
      await staffApi.updateStaff(id, role, token);
      // data.staff_info = {
      //   user_email: email,
      //   user_name: name,
      //   user_phone: phone,
      //   user_uuid: res.data.data.user_uuid,
      // };
      return {id: id, changes: role};
    } catch (error) {
      console.log(error);
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
      ToastAndroid.show(EXPIRED_TOKEN, ToastAndroid.SHORT);
      dispatch(logout());
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
    loading: false,
    check: false,
  }),
  reducers: {
    setCheck(state, {payload}) {
      state.check = payload;
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
      state.check = false;
      staffAdapter.updateOne(state, {
        id: payload.id,
        changes: {role: payload.changes},
      });
    },
  },
});

export const {setCheck} = staffSlice.actions;
export default staffSlice.reducer;
