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
    telegram?: String;
    twitter?: String;
    site?: String;
  };
}

export interface CreatedCompany {
  CreatedCompany: any;
  companyCreated: Company | null;
  loading: boolean;
  error: string | null;
}
