import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { findAllJobsThunk } from "./findAllJobsThunk";

import { JobsState, Job } from "./findAllJobs.types";

const findAllJobsSlice = createSlice({
  name: "findAllJobsSlice",
  initialState: <JobsState>{
    allJobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAllJobsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        findAllJobsThunk.fulfilled,
        (state, action: PayloadAction<Job[]>) => {
          state.loading = false;
          state.allJobs = action.payload;
        }
      )
      .addCase(findAllJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default findAllJobsSlice.reducer;
