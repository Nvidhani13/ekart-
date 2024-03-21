
// import userReducer from "./userDetails/userReducer";
// import cartReducer from "./cartinfo/cartReducer";
// import { configureStore } from '@reduxjs/toolkit'
// import { legacy_createStore } from "redux";
// import { combineReducers } from "redux";

// const rootReducer =combineReducers({
//     user: userReducer,
//     cartReducer:cartReducer
//   })
// const store = legacy_createStore(rootReducer)

// export default store;
// store.js
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducer';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // Add middleware, enhancers, etc. here if needed
});

const persistor = persistStore(store);

export { store, persistor };
