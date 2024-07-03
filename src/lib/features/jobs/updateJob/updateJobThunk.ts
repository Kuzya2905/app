import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { ApiEndpointsJobs } from "@/lib/features/types";
import { UpdateJob } from "./updateJobs.types";

const updateJobThunk = createAsyncThunk<string, UpdateJob>(
  "jobs/update",
  async ({ idJob, jobData }, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.put(
        `${ApiEndpointsJobs.JobApi}/${idJob}`,
        jobData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);

export default updateJobThunk;
