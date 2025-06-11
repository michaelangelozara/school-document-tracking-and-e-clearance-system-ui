import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  message: string;
  isOpen: boolean;
}
const initialState: InitialState = {
  message: "",
  isOpen: false,
};

const messageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    close: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { open, close } = messageSlice.actions;
export default messageSlice.reducer;
