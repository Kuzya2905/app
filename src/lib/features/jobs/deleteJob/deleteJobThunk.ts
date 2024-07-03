import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { ApiEndpointsJobs } from "@/lib/features/types";

const deleteJobThunk = createAsyncThunk<string, string>(
  "jobs/delete",
  async (idJob, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.delete(
        `${ApiEndpointsJobs.JobApi}/${idJob}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);

export default deleteJobThunk;
