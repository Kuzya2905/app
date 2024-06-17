import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import findOneJobThunk from "./findOneJobThunk";

import { JobsState, Job } from "./findOneJob.types";

const findOneJob = createSlice({
  name: "findOneJob",
  initialState: <JobsState>{
    foundJob: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findOneJobThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        findOneJobThunk.fulfilled,
        (state, action: PayloadAction<Job>) => {
          state.loading = false;
          state.foundJob = action.payload;
        }
      )
      .addCase(findOneJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default findOneJob.reducer;
