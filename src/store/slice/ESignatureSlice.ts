import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  data: string;
  hasESignature: boolean;
  isFetching: boolean;
}
const initialState: InitialState = {
  data: "",
  hasESignature: false,
  isFetching: false,
};

const eSignatureSlice = createSlice({
  name: "ESignature",
  initialState,
  reducers: {
    save: (state, action) => {
      state.hasESignature = true;
      state.data = action.payload;
    },
    remove: (state, action) => {
      state.hasESignature = false;
      state.data = "";
    },
    updateLoadingStatus: (state, action) => {
      state.isFetching = action.payload as boolean;
    },
  },
});

export const { save, remove, updateLoadingStatus } = eSignatureSlice.actions;
export default eSignatureSlice.reducer;
