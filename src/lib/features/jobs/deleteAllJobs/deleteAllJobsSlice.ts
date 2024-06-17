import { createSlice } from "@reduxjs/toolkit";

import { deleteAllJobsThunk } from "./deleteAllJobsThunk";

import { DeleteAllJobs } from "./deleteAllJobs.types";

const deleteAllJobs = createSlice({
  name: "deleteAllJobsSlice",
  initialState: <DeleteAllJobs>{
    message: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAllJobsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllJobsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteAllJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default deleteAllJobs.reducer;
