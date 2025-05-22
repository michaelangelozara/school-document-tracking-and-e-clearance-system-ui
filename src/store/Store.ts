import { configureStore } from "@reduxjs/toolkit";

import messageReducer from "./slice/MessageSlice";
import eSignatureReducer from "./slice/ESignatureSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    eSignature: eSignatureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
