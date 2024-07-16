import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./setting/slice";
import playReducer from "./play/slice";

const store = configureStore({
  reducer: {
    setting: settingReducer,
    play: playReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
