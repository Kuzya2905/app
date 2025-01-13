import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import findJobsByCompanyThunk from "./findJobsByCompanyThunk";

import { FoundJobs, Job } from "./findJobsByCompany.types";

const mockData = [{
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
},
{
  name: "Software Development Engineer",
  experience: 3,
  mode: "Full day",
  city: "London",
  description:
    "The team being recruited is implementing a software framework for developing data products on Apache Spark technology. This framework is intended to replace the historical heterogeneous solutions of application teams, through which will be achieved. This framework is intended to replace the historical heterogeneous solutions of application teams, which will be achieved.",
  salary: 7000,
  logo: "https://cdn.getro.com/companies/2da1be3c-a9cd-5af9-8ec5-e67430ea3196",
  date: "2024-04-20T06:30:00.000Z",
  expirationDate: "2025-04-20T06:30:00.000Z",
  requirements:
    "Coordination of team interaction within the framework of platform development projects. Increasing the efficiency of the development process, minimizing technical debt",
  responsibilities:
    "Strong technical background. Development experience in .NET",
  termsAndConditions:
    "Hybrid work format or full remote work in cities where we do not have offices",
  createdAt: "2024-06-19T06:50:47.425Z",
  updatedAt: "2024-06-19T06:50:47.425Z",
  idCompany: "6672a519ae5e6b1804a40b6c",
  id: "6672ace23168323ef020bb36",
},
{
  name: "Product Analyst",
  experience: 7,
  mode: "Full day",
  city: "London",
  description:
    "The team being recruited is implementing a software framework for developing data products on Apache Spark technology. This framework is intended to replace the historical heterogeneous solutions of application teams, through which will be achieved. This framework is intended to replace the historical heterogeneous solutions of application teams, which will be achieved.",
  salary: 8000,
  logo: "https://cdn.getro.com/companies/6bfa7e8b-1e80-5138-bb45-a24e979020d1",
  date: "2024-04-07T06:30:00.000Z",
  expirationDate: "2025-04-20T06:30:00.000Z",
  requirements:
    "Coordination of team interaction within the framework of platform development projects. Increasing the efficiency of the development process, minimizing technical debt",
  responsibilities:
    "Strong technical background. Development experience in .NET",
  termsAndConditions:
    "Hybrid work format or full remote work in cities where we do not have offices",
  createdAt: "2024-06-19T06:50:47.425Z",
  updatedAt: "2024-06-19T06:50:47.425Z",
  idCompany: "6672a519ae5e6b1804a40b6d",
  id: "6672ace23168323ef020bb37",
},
{
  name: "Lead QA Engineer",
  experience: 5,
  mode: "Full day",
  city: "London",
  description:
    "The team being recruited is implementing a software framework for developing data products on Apache Spark technology. This framework is intended to replace the historical heterogeneous solutions of application teams, through which will be achieved. This framework is intended to replace the historical heterogeneous solutions of application teams, which will be achieved.",
  requirements:
    "Coordination of team interaction within the framework of platform development projects. Increasing the efficiency of the development process, minimizing technical debt",
  responsibilities:
    "Strong technical background. Development experience in .NET",
  termsAndConditions:
    "Hybrid work format or full remote work in cities where we do not have offices",
  salary: 8000,
  logo: "https://cdn.getro.com/companies/9e381daf-fc2b-5372-ac8f-722a6036da61",
  date: "2024-04-15T06:30:00.000Z",
  expirationDate: "2025-04-20T06:30:00.000Z",
  createdAt: "2024-06-19T06:50:47.425Z",
  updatedAt: "2024-06-19T06:50:47.425Z",
  idCompany: "6672a519ae5e6b1804a40b70",
  id: "6672ace23168323ef020bb38",
}]

const findJobsByCompany = createSlice({
  name: "findJobsByCompany",
  initialState: <FoundJobs>{
    foundJobs: mockData,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findJobsByCompanyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        findJobsByCompanyThunk.fulfilled,
        (state, action: PayloadAction<Job[]>) => {
          state.loading = false;
          state.foundJobs = action.payload;
        }
      )
      .addCase(findJobsByCompanyThunk.rejected, (state, action) => {
        state.foundJobs = [];
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default findJobsByCompany.reducer;
