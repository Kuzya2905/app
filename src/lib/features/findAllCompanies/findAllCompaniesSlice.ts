import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { findAllCompaniesThunk } from "./findAllCompaniesThunk";
import { CompaniesState, Company } from "./findAllCompanies.types";

const findAllCompanies = createSlice({
  name: "findAllCompaniesSlice",
  initialState: <CompaniesState>{
    allCompanies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAllCompaniesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        findAllCompaniesThunk.fulfilled,
        (state, action: PayloadAction<Company[]>) => {
          state.loading = false;
          state.allCompanies = action.payload;
        }
      )
      .addCase(findAllCompaniesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default findAllCompanies.reducer;
