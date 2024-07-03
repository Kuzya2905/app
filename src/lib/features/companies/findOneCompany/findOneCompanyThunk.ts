import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { Company } from "./findOneCompany.types";
import { ApiEndpointsCompanies } from "@/lib/features/types";

const findOneCompanyThunk = createAsyncThunk<Company, string>(
  "companies/find",
  async (idCompany, { rejectWithValue }) => {
    try {
      const response = await axiosBackend(
        `${ApiEndpointsCompanies.CompanyAPI}/${idCompany}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);

export default findOneCompanyThunk;
