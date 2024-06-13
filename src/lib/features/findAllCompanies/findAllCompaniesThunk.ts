import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CompaniesState, Company } from "./findAllCompanies.types";
import { axiosBackend } from "../axiosWrapper";
import { ApiEndpoints } from "../types";

export const findAllCompaniesThunk = createAsyncThunk<Company[]>(
  "companies/findAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosBackend(ApiEndpoints.FindAllCompanies);
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);
