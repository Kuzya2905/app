import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { createCompanyThunk } from "./createCompanyThunk";

import { Company, CreatedCompany } from "./createCompany.types";

const createCompanySlice = createSlice({
  name: "createCompanySlice",
  initialState: <CreatedCompany>{
    companyCreated: null,
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
          state.companyCreated = action.payload;
        }
      )
      .addCase(createCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default createCompanySlice.reducer;
