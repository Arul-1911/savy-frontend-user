import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "./features/authSlice";
import loadingReducer from "./features/loadingSlice";
import { apiSlice } from "./features/apiSlice";
import authReducer from "./features/authSlice";
import periodReducer from "./features/periodSlice";
import dashBoardReducer from "./features/dashBoardSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  period: periodReducer,
  dashBoard: dashBoardReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  });
};

export default store;
