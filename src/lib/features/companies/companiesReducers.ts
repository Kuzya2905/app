import { combineReducers } from "@reduxjs/toolkit";

import createCompanyReducer from "@/lib/features/companies/createCompany/createCompanySlice";
import deleteAllCompaniesReducer from "@/lib/features/companies/deleteAllCompanies/deleteAllCompaniesSlice";
import deleteCompanyReducer from "@/lib/features/companies/deleteCompany/deleteCompanySlice";
import findAllCompaniesReducer from "@/lib/features/companies/findAllCompanies/findAllCompaniesSlice";
import findOneCompanyReducer from "@/lib/features/companies/findOneCompany/findOneCompanySlice";
import updateCompanyReducer from "@/lib/features/companies/updateCompany/updateCompanySlice";

const companiesReducers = combineReducers({
  createCompany: createCompanyReducer,
  deleteAllCompanies: deleteAllCompaniesReducer,
  deleteCompany: deleteCompanyReducer,
  findAllCompanies: findAllCompaniesReducer,
  findOneCompany: findOneCompanyReducer,
  updateCompany: updateCompanyReducer,
});

export default companiesReducers;
