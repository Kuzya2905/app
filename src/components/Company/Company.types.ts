import { Company } from "@/lib/features/companies/findOneCompany/findOneCompany.types";

export interface CompanyTypes {
  companyId: string;
}

export interface VacancyCardType {
  id: number;
  idCompany: number;
  name: string;
  experience: number;
  city: string;
  description: string;
  salary: number;
  company: string;
  logo: string;
  date: string;
  typeOfEmployment: string;
  expirationDate: string;
}

export interface CompanyData extends Company {}
