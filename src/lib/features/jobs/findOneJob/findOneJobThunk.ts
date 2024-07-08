import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { ApiEndpointsJobs } from "@/lib/features/types";
import { Job } from "./findOneJob.types";

const findOneJobThunk = createAsyncThunk<Job, string>(
  "jobs/findOne",
  async (idJob, { rejectWithValue }) => {
    try {
      const response = await axiosBackend(
        `${ApiEndpointsJobs.JobApi}/${idJob}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export default findOneJobThunk;
