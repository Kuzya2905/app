export interface Job {
  id: string;
  name: string;
  city: string;
  description: string;
  sizeCompany: string;
  logo: string;
  industry: string;
  contactLinks: string;
  experience: string;
  requirements: string;
  responsibilities: string;
  mode: string;
  salary: number;
  idCompany: string;
  createdAt: string;
  nameCompany: string;
  termsAndConditions: string;
  walletAddress?: string;
}

export interface JobState {
  foundJob: Job | null;
  loading: boolean;
  error: string | null;
}
