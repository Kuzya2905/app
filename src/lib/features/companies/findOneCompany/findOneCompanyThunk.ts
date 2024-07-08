import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { FoundCompany } from "./findOneCompany.types";
import { ApiEndpointsCompanies } from "@/lib/features/types";

const findOneCompanyThunk = createAsyncThunk<FoundCompany, string>(
  "companies/find",
  async (idCompany, { rejectWithValue }) => {
    try {
      const response = await axiosBackend(
        `${ApiEndpointsCompanies.CompanyAPI}/${idCompany}`
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

export default findOneCompanyThunk;
