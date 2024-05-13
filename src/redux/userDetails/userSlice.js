// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  loggedIn:false,
  admin:false,
  token:{
    access:'',
    refresh:''
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn(state, action) {
        console.log("action handler")
        console.log(action.payload,"This is action")
      const { username, email,admin,accessToken,refreshToken } = action.payload;
      console.log(username)
      console.log(email,"this is email")

      state.username = username;
      state.email = email;
      state.loggedIn=true;
      state.admin=admin;
      state.token = { ...state.token, refresh: refreshToken, access: accessToken };
      console.log(state,"this is state ")
    },
    loggedOut(state) {
      state.username = '';
      state.email = '';
      state.loggedIn=false;
      state.admin=false;
      state.token='';
    },
    updateToken(state,action){
      console.log(action.payload)
      const{ accessToken,refreshToken}=action.payload;
  
        console.log(accessToken,"this is access token in update token")
        console.log(refreshToken,"this is access token in refresh token")

        state.token = { ...state.token, refresh: refreshToken, access: accessToken }; // Update token


    }
  },
});

export const { loggedIn, loggedOut ,updateToken} = userSlice.actions;

export default userSlice.reducer;
