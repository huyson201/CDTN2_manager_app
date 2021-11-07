import {configureStore} from '@reduxjs/toolkit';
import userReducer from './auth/userSlice';
import staffReducer from './staff/staffSlice';
const store = configureStore({
  reducer: {
    users: userReducer,
    staffs: staffReducer,
  },
});
export default store;
