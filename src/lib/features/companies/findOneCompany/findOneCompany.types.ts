export interface Company {
  id: string;
  city: string;
  description: string;
  sizeCompany: string;
  logo: string;
  title: string;
  industry: string;
  vacancyNumber: number;
  contactLinks: {
    telegram: String;
    twitter: String;
    site: String;
  };
  vacancy: [];
}

export interface CompanyState {
  foundCompany: Company | null;
  loading: boolean;
  error: string | null;
}
