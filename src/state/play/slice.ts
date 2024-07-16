import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlayState = {
  isPlaying: boolean;
};

const initialState: PlayState = {
  isPlaying: false,
};

const playSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setIsPlaying } = playSlice.actions;
export default playSlice.reducer;
