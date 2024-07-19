import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SettingState = {
  min: number;
  max: number;
  clef: "treble" | "bass" | "mixed";
  bpm: number;
};

const defaultState: SettingState = {
  min: 0,
  max: 16,
  clef: "treble",
  bpm: 90,
};

const initialState: SettingState = loadStateFromLocalStorage() || { ...defaultState };

function loadStateFromLocalStorage(): SettingState | undefined {
  try {
    const serializedState = localStorage.getItem("settingState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
}

function saveStateToLocalStorage(state: SettingState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("settingState", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
}

const isValidSetting = (setting: SettingState): boolean => {
  if (setting.min > setting.max) return false;
  if (setting.min < defaultState.min) return false;
  if (setting.max > defaultState.max) return false;

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
        saveStateToLocalStorage(newState);
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
