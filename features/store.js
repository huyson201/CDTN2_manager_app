import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auth/userSlice';
import staffReducer from './staff/staffSlice';
import hotelReducer from './hotel/hotelSlice';
import invoiceReducer from './invoice/invoiceSlice'
const store = configureStore({
  reducer: {
    users: userReducer,
    staffs: staffReducer,
    hotels: hotelReducer,
    invoice: invoiceReducer,
  },
});
export default store;
