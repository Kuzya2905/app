export const BACKEND_URL = "http://localhost:8080/api/company";

export interface Company {
  name: string;
  city: string;
  description: string;
  sizeCompany: string;
  logo: string;
  title: string;
  industry: string;
  contactLinks: string;
}

export interface CompaniesState {
  allCompanies: Company[];
  loading: boolean;
  error: string | null;
}
