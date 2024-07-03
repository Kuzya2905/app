import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { ApiEndpointsJobs } from "@/lib/features/types";

export const deleteAllJobsThunk = createAsyncThunk(
  "jobs/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.delete(ApiEndpointsJobs.JobApi);
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);
