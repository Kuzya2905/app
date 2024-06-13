import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createCompanyThunk } from "./createCompanyThunk";
import { CompaniesState, Company } from "./createCompany.types";

const createCompanySlice = createSlice({
  name: "createCompanySlice",
  initialState: <CompaniesState>{
    companies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCompanyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createCompanyThunk.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.loading = false;
          state.companies.push(action.payload);
        }
      )
      .addCase(createCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default createCompanySlice.reducer;
