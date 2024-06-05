export interface CompanyEditFormTypes {
  city?: string;
  logo?: string | null;
  industry?: string;
  sizeCompany?: string;
  description: string;
  title: string;
  link: string;
  telegram: string;
  [key: string]: string | null | undefined;
}
