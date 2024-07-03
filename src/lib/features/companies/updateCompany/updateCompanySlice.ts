import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import updateCompanyThunk from "./updateCompanyThunk";

import { UpdatedCompany } from "./updateCompany.types";

const updateCompanySlice = createSlice({
  name: "updateCompanySlice",
  initialState: <UpdatedCompany>{
    status: null,
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
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.status = action.payload;
        }
      )
      .addCase(updateCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default updateCompanySlice.reducer;
