import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import deleteJobThunk from "./deleteJobThunk";

import { JobState } from "./deleteJob.types";

const deleteJob = createSlice({
  name: "deleteJob",
  initialState: <JobState>{
    message: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteJobThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteJobThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.message = action.payload;
        }
      )
      .addCase(deleteJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default deleteJob.reducer;
