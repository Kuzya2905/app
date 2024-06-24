export interface Company {
  vacancy: [];
  id: string;
  title: string;
  name: string;
  city: string;
  description: string;
  sizeCompany: string;
  logo: string;
  vacancyNumber: number;
  industry: string;
  contactLinks: {
    telegram: string;
    twitter: string;
    site: string;
  };
}

export interface CompaniesState {
  allCompanies: Company[];
  loading: boolean;
  error: string | null;
}
