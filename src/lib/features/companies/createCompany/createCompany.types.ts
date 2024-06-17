export interface Company {
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
}

export interface CreatedCompany {
  companyCreated: Company | null;
  loading: boolean;
  error: string | null;
}
