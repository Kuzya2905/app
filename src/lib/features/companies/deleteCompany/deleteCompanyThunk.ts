import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { ApiEndpointsCompanies } from "@/lib/features/types";

const deleteCompanyThunk = createAsyncThunk<string, string>(
  "companies/delete",
  async (idCompany, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.delete(
        `${ApiEndpointsCompanies.CompanyAPI}/${idCompany}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);

export default deleteCompanyThunk;
