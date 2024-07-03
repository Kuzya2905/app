import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { Company } from "./createCompany.types";
import { ApiEndpointsCompanies } from "@/lib/features/types";

export const createCompanyThunk = createAsyncThunk<Company, Company>(
  "companies/create",
  async (company, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.post(
        ApiEndpointsCompanies.CompanyAPI,
        company
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);
