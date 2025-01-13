import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import findOneJobThunk from "./findOneJobThunk";

import { JobState, Job } from "./findOneJob.types";
const mockData = {
    name: "Lead QA Engineer",
    experience: 3,
    mode: "Remote",
    city: "Dubai",
    description:
      "The team being recruited is implementing a software framework for developing data products on Apache Spark technology. This framework is intended to replace the historical heterogeneous solutions of application teams, through which will be achieved. This framework is intended to replace the historical heterogeneous solutions of application teams, which will be achieved.",
    requirements:
      "Coordination of team interaction within the framework of platform development projects. Increasing the efficiency of the development process, minimizing technical debt",
    responsibilities:
      "Strong technical background. Development experience in .NET",
    termsAndConditions:
      "Hybrid work format or full remote work in cities where we do not have offices",
    salary: 5000,
    logo: "https://cdn.getro.com/companies/1df17e37-856f-543e-a964-1b2f51f1d305",
    date: "2024-04-04T06:30:00.000Z",
    expirationDate: "2025-04-04T06:30:00.000Z",
    createdAt: "2024-06-19T06:50:47.424Z",
    updatedAt: "2024-06-19T06:50:47.424Z",
    id: "6672ace23168323ef020bb35",
    idCompany: "6672a519ae5e6b1804a40b6b",
}

const findOneJobSlice = createSlice({
  name: "findOneJobSlice",
  initialState: <JobState>{
    foundJob: mockData,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findOneJobThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        findOneJobThunk.fulfilled,
        (state, action: PayloadAction<Job>) => {
          state.loading = false;
          state.foundJob = action.payload;
        }
      )
      .addCase(findOneJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default findOneJobSlice.reducer;
