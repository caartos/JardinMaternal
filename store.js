import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import childReducer from "./reducers/childReducer";

const rootReducer = combineReducers({
  user: userReducer,
  child: childReducer,
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
