import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { ApiEndpointsJobs } from "@/lib/features/types";
import { Job } from "./findAllJobs.types";

export const findAllJobsThunk = createAsyncThunk<Job[]>(
  "jobs/findAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosBackend(ApiEndpointsJobs.JobApi);
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);
