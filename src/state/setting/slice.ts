import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SettingState = {
  min: number;
  max: number;
  clef: "treble" | "bass" | "mixed";
};

const initialState: SettingState = {
  min: 0,
  max: 16,
  clef: "treble",
};

const isValidSetting = (setting: SettingState): boolean => {
  if (setting.min > setting.max) return false;
  if (setting.min < initialState.min) return false;
  if (setting.max > initialState.max) return false;

  const validClefs = ["treble", "bass", "mixed"];
  if (!validClefs.includes(setting.clef)) return false;
  return true;
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<Partial<SettingState>>) => {
      const newState = { ...state, ...action.payload };
      if (isValidSetting(newState)) {
        return newState;
      } else {
        console.error("Invalid setting:", action.payload);
        return state;
      }
    },
  },
});

export const { setSetting } = settingSlice.actions;
export default settingSlice.reducer;
