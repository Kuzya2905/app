import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Company, UpdateCompany } from "./deleteCompany.types";
import { axiosBackend } from "../axiosWrapper";
import { ApiEndpoints } from "../types";

const deleteCompanyThunk = createAsyncThunk<string>(
  "companies/delete",
  async (idCompany, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.delete(
        `${ApiEndpoints.DeleteCompany}/${idCompany}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);

export default deleteCompanyThunk;
