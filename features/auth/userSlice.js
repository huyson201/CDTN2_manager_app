import {createSlice} from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    refreshToken: null,
    isRemembered: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isRemembered = true;
    },
    logout(state) {
      state.user = null;
      state.isRemembered = false;
    },
    setRememberMe(state, action) {
      state.isRemembered = action.payload;
    },
  },
});

export const {login, logout, setRememberMe} = userSlice.actions;
export default userSlice.reducer;
