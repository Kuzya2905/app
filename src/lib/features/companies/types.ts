import { CompaniesState } from "@/lib/features/companies/findAllCompanies/findAllCompanies.types";
import { CompanyState } from "./findOneCompany/findOneCompany.types";

export interface CompaniesReducersTypes {
  companiesReducers: {
    findAllCompanies: CompaniesState;
    findOneCompany: CompanyState;
  };
}
