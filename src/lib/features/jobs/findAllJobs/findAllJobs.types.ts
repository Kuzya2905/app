export interface Job {
  id: string;
  name: string;
  city: string;
  description: string;
  sizeCompany: string;
  logo: string;
  industry: string;
  contactLinks: string;
  experience: number;
  mode: string;
  salary: number;
  idCompany: string;
  createdAt: string;
  nameCompany: string;
}

export interface JobsState {
  allJobs: Job[];
  loading: boolean;
  error: string | null;
}
