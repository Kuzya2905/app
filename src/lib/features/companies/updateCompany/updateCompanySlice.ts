import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import updateCompanyThunk from "./updateCompanyThunk";

import { CompaniesState, Company } from "./updateCompany.types";

const updateCompanySlice = createSlice({
  name: "updateCompanySlice",
  initialState: <CompaniesState>{
    updatedCompany: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCompanyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateCompanyThunk.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.loading = false;
          state.updatedCompany = action.payload;
        }
      )
      .addCase(updateCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default updateCompanySlice.reducer;
