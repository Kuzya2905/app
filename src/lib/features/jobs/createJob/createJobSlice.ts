import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { createJobThunk } from "./createJobThunk";

import { CreatedJob, Job } from "./createJob.types";

const createJobSlice = createSlice({
  name: "createJobSlice",
  initialState: <CreatedJob>{
    jobCreated: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createJobThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createJobThunk.fulfilled,
        (state, action: PayloadAction<Job>) => {
          state.loading = false;
          state.jobCreated = action.payload;
        }
      )
      .addCase(createJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default createJobSlice.reducer;
