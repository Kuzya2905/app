import { createSlice } from "@reduxjs/toolkit";
import { deleteAllCompaniesThunk } from "./deleteAllCompaniesThunk";
import { DeleteAllCompanies } from "./deleteAllCompanies.types";

const deleteAllCompanies = createSlice({
  name: "deleteAllCompaniesSlice",
  initialState: <DeleteAllCompanies>{
    message: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAllCompaniesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllCompaniesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteAllCompaniesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default deleteAllCompanies.reducer;
