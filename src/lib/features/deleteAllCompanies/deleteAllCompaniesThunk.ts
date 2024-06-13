import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosBackend } from "../axiosWrapper";
import { ApiEndpoints } from "../types";

export const deleteAllCompaniesThunk = createAsyncThunk(
  "companies/findAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.delete(
        ApiEndpoints.DeleteAllCompanies
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);
