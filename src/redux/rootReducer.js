// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userDetails/userSlice';
import cartReducer from './cartinfo/cartSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart:cartReducer
  // Add other reducers here if any
});

export default rootReducer;
