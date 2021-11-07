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
  async ({id,token}, {dispatch}) => {
    try {
      const res = await staffApi.getStaffByHotelId(id,token);
      return res.data.data;
    } catch (error) {
      ToastAndroid.show(EXPIRED_TOKEN, ToastAndroid.SHORT);
      dispatch(logout());
    }
  },
);
export const deleteStaffByID = createAsyncThunk(
  'staffs/deleteStaffByID',
  async ({id,token}, {dispatch}) => {
    try {
      const res = await staffApi.deleteStaffById(id,token);
      return res.data.data;
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
  }),
  reducers: {},
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
  },
});

export const {} = staffSlice.actions;
export default staffSlice.reducer;
