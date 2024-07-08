import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { ApiEndpointsJobs } from "@/lib/features/types";
import { Job } from "./createJob.types";

export const createJobThunk = createAsyncThunk<Job, Job>(
  "jobs/create",
  async (job, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.post(ApiEndpointsJobs.JobApi, job);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
