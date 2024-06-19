export interface VacancyApplyTypes {
  dataCompany?: {
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
  };
  idCompany: string | null;
}
