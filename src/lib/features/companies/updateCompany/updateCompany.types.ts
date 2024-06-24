export interface Company {
  city: string;
  description: string;
  sizeCompany: string;
  logo: string;
  title: string;
  industry: string;
  contactLinks: {
    telegram: string;
    twitter: string;
    site: string;
  };
}

export interface UpdateCompany {
  idCompany: string;
  companyData: Company;
}

export interface UpdatedCompany {
  status: string | null;
  loading: boolean;
  error: string | null;
}
