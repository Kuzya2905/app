export interface Company {
  id: string;
  title: string;
  name: string;
  city: string;
  description: string;
  sizeCompany: string;
  logo: string;
  vacancyNumber: number;
  industry: string;
  contactLinks: string;
}

export interface CompaniesState {
  allCompanies: Company[];
  loading: boolean;
  error: string | null;
}
