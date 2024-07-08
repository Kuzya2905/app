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
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
