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
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);

export default findOneJobThunk;
