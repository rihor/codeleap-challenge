import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string | null;
}

const initialState: UserState = {
  name: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUsername: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { changeUsername } = userSlice.actions;

export default userSlice.reducer;
