import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import hotelApi from '../../api/hotelApi';
import userApi from '../../api/userApi';
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

const hotelAdapter = createEntityAdapter({
  selectId: hotel => hotel.hotel_id,
});
export const hotelSelectors = hotelAdapter.getSelectors(state => state.hotels);
const hotelSlice = createSlice({
  name: 'hotels',
  initialState: hotelAdapter.getInitialState({
    selectedHotel: null,
    loading: false,
  }),
  reducers: {
    setSelectedHotel(state,{payload}) {
      state.selectedHotel = payload
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
  },
});

export const {setSelectedHotel} = hotelSlice.actions;
export default hotelSlice.reducer;
