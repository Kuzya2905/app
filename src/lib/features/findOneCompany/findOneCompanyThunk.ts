import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Company } from "./findOneCompany.types";
import { axiosBackend } from "../axiosWrapper";
import { ApiEndpoints } from "../types";

const findOneCompanyThunk = createAsyncThunk<Company, string>(
  "companies/findOne",
  async (idCompany, { rejectWithValue }) => {
    try {
      const response = await axiosBackend(
        `${ApiEndpoints.FindOneCompany}/${idCompany}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axios.isAxiosError(error));
    }
  }
);

export default findOneCompanyThunk;
