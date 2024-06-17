import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { ApiEndpointsCompanies } from "@/lib/features/types";
import { Company, UpdateCompany } from "./updateCompany.types";

const updateCompanyThunk = createAsyncThunk<Company, UpdateCompany>(
  "companies/update",
  async ({ idCompany, companyData }, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.put(
        `${ApiEndpointsCompanies.CompanyAPI}/${idCompany}`,
        companyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);

export default updateCompanyThunk;
