import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { Company } from "./findAllCompanies.types";
import { ApiEndpointsCompanies } from "@/lib/features/types";

export const findAllCompaniesThunk = createAsyncThunk<Company[]>(
  "companies/findAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosBackend(ApiEndpointsCompanies.CompanyAPI);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
