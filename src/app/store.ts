import { configureStore } from "@reduxjs/toolkit";

import harfileReducer from "../features/har-file/har-file-slice";

export const store = configureStore({
  reducer: {
    harFile: harfileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
