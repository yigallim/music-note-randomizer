import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./setting/slice";

const store = configureStore({
  reducer: {
    setting: settingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
