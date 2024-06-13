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

export interface UpdateCompany {
  idCompany: string;
  companyData: Company;
}

export interface CompaniesState {
  message: string;
  loading: boolean;
  error: string | null;
}
