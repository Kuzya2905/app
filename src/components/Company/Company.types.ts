export interface CompanyTypes {
  companyId: string;
}

export interface VacancyCardType {
  id: number;
  idCompany: number;
  name: string;
  experience: number;
  city: string;
  description: string;
  salary: number;
  company: string;
  logo: string;
  createdAt: string;
  mode: string;
  expirationDate: string;
}
