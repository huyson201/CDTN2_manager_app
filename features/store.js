import {configureStore} from '@reduxjs/toolkit';
import userReducer from './auth/userSlice';
import staffReducer from './staff/staffSlice';
import hotelReducer from './hotel/hotelSlice';
const store = configureStore({
  reducer: {
    users: userReducer,
    staffs: staffReducer,
    hotels: hotelReducer
  },
});
export default store;
