export interface Job {
  name: string;
  experience: number;
  mode: string;
  description: string;
  requirements: string;
  responsibilities: string;
  termsAndConditions: string;
  salary: number;
  qualification: string;
  publishingSettings: string;
  other: string;
  idCompany: string;
  id: string;
  createdAt: string;
  city: string;
}

export interface JobState {
  foundJob: Job | null;
  loading: boolean;
  error: string | null;
}
