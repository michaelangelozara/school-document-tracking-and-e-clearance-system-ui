import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isApplying: boolean;
}
const initialState: InitialState = {
  isApplying: false,
};

const letterSlice = createSlice({
  name: "Lette Slice",
  initialState,
  reducers: {
    applying: (state) => {
      state.isApplying = true;
    },
    stopApplying: (state) => {
      state.isApplying = false;
    },
  },
});

export const { applying, stopApplying } = letterSlice.actions;
export default letterSlice.reducer;
