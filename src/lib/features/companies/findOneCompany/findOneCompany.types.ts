export interface Company {
  id: string;
  city: string;
  description: string;
  sizeCompany: string;
  logo: string;
  title: string;
  industry: string;
  walletAddress: string;
  contactLinks: {
    telegram: string;
    twitter: string;
    site: string;
  };
  vacancy: [];
}

export interface CompanyState {
  foundCompany: Company | null;
  loading: boolean;
  error: string | null;
}
