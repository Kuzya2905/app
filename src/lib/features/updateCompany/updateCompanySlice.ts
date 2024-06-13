import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CompaniesState, Company } from "./updateCompany.types";
import updateCompanyThunk from "./updateCompanyThunk";

const updateCompany = createSlice({
  name: "updateCompany",
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

export default updateCompany.reducer;
