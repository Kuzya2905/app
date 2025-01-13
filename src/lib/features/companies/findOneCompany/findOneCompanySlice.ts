import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { CompanyState, FoundCompany } from "./findOneCompany.types";

const mockData = {
  vacancy: [
    "6672ace23168323ef020bb36",
    "6672ace23168323ef020bb3b",
    "6672ace23168323ef020bb40",
    "6672ace23168323ef020bb44",
    "6672ace23168323ef020bb49",
    "6672ace23168323ef020bb4e",
    "6672ace23168323ef020bb52",
    "6672ace23168323ef020bb57",
    "6672ace23168323ef020bb5d",
  ],
  logo: "https://cdn.getro.com/companies/2da1be3c-a9cd-5af9-8ec5-e67430ea3196",
  title: "Bemo",
  description:
    "Bemo is the first liquid staking app on TON. We are building a stake-to-earn platform to change how users manage their TON holdings.",
  city: "London",
  sizeCompany: "1 - 50",
  industry: "IT",
  createdAt: "2024-06-19T07:25:05.092Z",
  updatedAt: "2024-06-19T07:25:05.092Z",
  id: "6672a519ae5e6b1804a40b6c",
}

const findOneCompanySlice = createSlice({
  name: "findOneCompanySlice",
  initialState: <CompanyState>{
    foundCompany: mockData,
    loading: false,
    error: null,
  },
  reducers: {},
 
});

export default findOneCompanySlice.reducer;
