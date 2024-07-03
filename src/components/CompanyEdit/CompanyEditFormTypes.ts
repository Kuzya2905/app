export interface CompanyEditFormTypes {
  logo?: string | null;
  city?: string;
  sizeCompany?: string;
  industry?: string;
  walletAddress?: string;
  twitter?: string;
  title: string;
  link: string;
  description: string;
  telegram: string;
  [key: string]: string | null | undefined;
}
