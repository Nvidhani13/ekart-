// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  loggedIn:false,
  admin:false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn(state, action) {
        console.log("action handler")
        console.log(action.payload,"This is action")
      const { username, email,admin } = action.payload;
      console.log(username)
      console.log(email,"this is email")

      state.username = username;
      state.email = email;
      state.loggedIn=true
      state.admin=admin
    },
    loggedOut(state) {
      state.username = '';
      state.email = '';
      state.loggedIn=false;
      state.admin=false
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;

export default userSlice.reducer;
