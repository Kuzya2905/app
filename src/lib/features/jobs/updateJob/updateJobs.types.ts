export interface Job {
  nameCompany?: string;
  logo?: string | null;
  name?: string;
  experience?: number;
  mode?: string;
  description?: string;
  requirements?: string;
  responsibilities?: string;
  termsAndConditions?: string;
  salary?: number;
  qualification?: string;
  publishingSettings?: string;
  other?: string;
}

export interface UpdateJob {
  idJob: string;
  jobData: Job;
}

export interface UpdatedJob {
  status: string | null;
  loading: boolean;
  error: string | null;
}
