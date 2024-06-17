export interface Job {
  name: string;
  city: string;
  description: string;
  sizeCompany: string;
  logo: string;
  title: string;
  industry: string;
  contactLinks: string;
}

export interface JobsState {
  foundJob: Job | null;
  loading: boolean;
  error: string | null;
}
