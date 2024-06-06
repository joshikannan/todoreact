// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import loginReducer from "../reducers/loginSlice";
import userSlice, { useReducer } from "../reducers/userSlice";

// import todoReducer from "../reducers/todoSlice";

const persistConfig = {
  key: "root", // Key for storing the persisted state
  storage, // Use local storage
};

const rootReducer = combineReducers({
  login: loginReducer,
  user: userSlice,
  //   todo: todoReducer,
  // Add other reducers here if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

export default store;
