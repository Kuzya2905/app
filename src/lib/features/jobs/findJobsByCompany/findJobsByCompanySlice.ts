import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import findJobsByCompanyThunk from "./findJobsByCompanyThunk";

import { FoundJobs, Job } from "./findJobsByCompany.types";

const findJobsByCompany = createSlice({
  name: "findJobsByCompany",
  initialState: <FoundJobs>{
    foundJobs: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findJobsByCompanyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        findJobsByCompanyThunk.fulfilled,
        (state, action: PayloadAction<Job[]>) => {
          state.loading = false;
          state.foundJobs = action.payload;
        }
      )
      .addCase(findJobsByCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default findJobsByCompany.reducer;
