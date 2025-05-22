import { configureStore } from "@reduxjs/toolkit";

import messageReducer from "./slice/MessageSlice";
import eSignatureReducer from "./slice/ESignatureSlice";
import letterReducer from "./slice/LetterSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    eSignature: eSignatureReducer,
    letter: letterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
