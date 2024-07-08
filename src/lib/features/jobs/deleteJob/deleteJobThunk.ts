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
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export default deleteJobThunk;
