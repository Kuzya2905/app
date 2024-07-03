import { CompanyState } from "./findOneCompany/findOneCompany.types";
import { CreatedCompany } from "./createCompany/createCompany.types";
import { UpdatedCompany } from "./updateCompany/updateCompany.types";
import { CompaniesState } from "./findAllCompanies/findAllCompanies.types";

export interface CompaniesReducersTypes {
  companiesReducers: {
    findAllCompanies: CompaniesState;
    findOneCompany: CompanyState;
    createCompany: CreatedCompany;
    updateCompany: UpdatedCompany;
  };
}
