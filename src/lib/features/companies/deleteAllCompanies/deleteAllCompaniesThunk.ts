import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { ApiEndpointsCompanies } from "@/lib/features/types";

export const deleteAllCompaniesThunk = createAsyncThunk(
  "companies/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.delete(
        ApiEndpointsCompanies.CompanyAPI
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);
