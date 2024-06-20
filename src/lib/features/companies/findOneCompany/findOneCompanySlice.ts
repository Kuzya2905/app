import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import findOneCompanyThunk from "./findOneCompanyThunk";

import { CompanyState, Company } from "./findOneCompany.types";

const findOneCompanySlice = createSlice({
  name: "findOneCompanySlice",
  initialState: <CompanyState>{
    foundCompany: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findOneCompanyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        findOneCompanyThunk.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.loading = false;
          state.foundCompany = action.payload;
        }
      )
      .addCase(findOneCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default findOneCompanySlice.reducer;
