export interface VacancyApplyTypes {
  dataCompany?: {
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
    vacancy: [];
  };
  idCompany: string | undefined;
}
