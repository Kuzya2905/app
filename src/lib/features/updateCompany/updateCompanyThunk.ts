import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Company, UpdateCompany } from "./updateCompany.types";
import { axiosBackend } from "../axiosWrapper";
import { ApiEndpoints } from "../types";

const updateCompanyThunk = createAsyncThunk<Company, UpdateCompany>(
  "companies/update",
  async ({ idCompany, companyData }, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.put(
        `${ApiEndpoints.UpdateCompany}/${idCompany}`,
        companyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);

export default updateCompanyThunk;
