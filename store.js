import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import childReducer from "./reducers/childReducer";
import roomReducer from "./reducers/roomReducer";

const rootReducer = combineReducers({
  user: userReducer,
  child: childReducer,
  room: roomReducer,
  // Otros reducers si los tienes
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
