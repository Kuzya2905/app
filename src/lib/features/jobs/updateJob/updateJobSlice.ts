import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import updateJobThunk from "./updateJobThunk";

import { JobsState } from "./updateJobs.types";

const updateJobSlice = createSlice({
  name: "updateJobSlice",
  initialState: <JobsState>{
    massage: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateJobThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateJobThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.massage = action.payload;
        }
      )
      .addCase(updateJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default updateJobSlice.reducer;
