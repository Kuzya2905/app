export interface Company {
  id?: string;
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
}

export interface CreatedCompany {
  companyCreated: Company | null;
  loading: boolean;
  error: string | null;
}
