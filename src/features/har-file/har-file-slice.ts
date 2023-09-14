import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HARFileData } from "../../common/types";

interface HARFileState {
  data: HARFileData | null;
}

const initialState: HARFileState = {
  data: null,
};

const harFileSlice = createSlice({
  name: "har-file",
  initialState,
  reducers: {
    addFile(state, action: PayloadAction<HARFileData>) {
      state.data = action.payload;
    },
    removeFile(state) {
      state.data = null;
    },
  },
});

export const { addFile, removeFile } = harFileSlice.actions;
export default harFileSlice.reducer;
