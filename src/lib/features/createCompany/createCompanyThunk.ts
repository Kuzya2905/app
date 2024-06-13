import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Company } from "./createCompany.types";
import { axiosBackend } from "../axiosWrapper";
import { ApiEndpoints } from "../types";

export const createCompanyThunk = createAsyncThunk<Company, Company>(
  "companies/create",
  async (company, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.post(
        ApiEndpoints.CompanyCreate,
        company
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);
