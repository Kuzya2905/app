import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import deleteCompanyThunk from "./deleteCompanyThunk";

import { CompanyState } from "./deleteCompany.types";

const deleteCompany = createSlice({
  name: "deleteCompany",
  initialState: <CompanyState>{
    message: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCompanyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteCompanyThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.message = action.payload;
        }
      )
      .addCase(deleteCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default deleteCompany.reducer;
