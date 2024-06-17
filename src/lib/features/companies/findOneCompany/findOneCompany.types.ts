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
  foundCompany: Company | null;
  loading: boolean;
  error: string | null;
}
