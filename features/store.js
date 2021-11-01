import { configureStore } from "@reduxjs/toolkit";
import userReducer from './auth/userSlice'
const store = configureStore({
    reducer: {
      users: userReducer,
    },
  });
  export default store;
  