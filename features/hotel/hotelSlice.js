import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import hotelApi from '../../api/hotelApi';
import {resetToken} from '../../src/utilFunc';
export const getHotelsOfUser = createAsyncThunk(
  'hotels/getHotelsOfUser',
  async ({id, userToken}, thunkAPI) => {
    try {
      const res = await hotelApi.getHotelsOfOwner(id, userToken);
      return res.data.data;
    } catch (error) {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const newToken = resetToken(thunkAPI.dispatch, refreshToken);
      console.log(newToken);
      const res = await hotelApi.getHotelsOfOwner(id, newToken);
      return res.data.data;
    }
  },
);

// export const deleteHotelSlice = createAsyncThunk(
//   'hotels/delete',
//   async ({id, token}, thunkAPI) => {
//     try {
//       await hotelApi.delete(id, token);
//       return id;
//     } catch (error) {
//       console.log(error);
//     }
//   },
// );

const hotelAdapter = createEntityAdapter({
  selectId: hotel => hotel.hotel_id,
});
export const hotelSelectors = hotelAdapter.getSelectors(state => state.hotels);
const hotelSlice = createSlice({
  name: 'hotels',
  initialState: hotelAdapter.getInitialState({
    selectedHotel: null,
    loading: false,
    services: null,
  }),
  reducers: {
    setSelectedHotel(state, {payload}) {
      state.selectedHotel = payload;
    },
    removeSelectedHotel(state) {
      state.selectedHotel = null;
    },
    setServices(state, {payload}) {
      state.services = payload;
    },
  },
  extraReducers: {
    [getHotelsOfUser.pending]: state => {
      state.loading = true;
    },
    [getHotelsOfUser.rejected]: state => {
      state.loading = false;
    },
    [getHotelsOfUser.fulfilled]: (state, {payload}) => {
      hotelAdapter.setAll(state, payload);
      state.loading = false;
    },
    // [deleteHotelSlice.pending]: state => {
    //   state.loading = true;
    // },
    // [deleteHotelSlice.rejected]: state => {
    //   state.loading = false;
    // },
    // [deleteHotelSlice.fulfilled]: (state, {payload}) => {
    //   hotelAdapter.removeOne(state, payload);
    //   state.loading = false;
    // },
  },
});

export const {setSelectedHotel, removeSelectedHotel, setServices} =
  hotelSlice.actions;
export default hotelSlice.reducer;
