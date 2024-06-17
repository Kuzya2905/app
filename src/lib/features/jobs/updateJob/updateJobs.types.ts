export interface Job {
  salary: Number;
  experience: Number;
  description: String;
  name: String;
  mode: String;
  logo: String;
  city: String;
  date?: Date;
  lastModify?: Date;
  expirationDate?: Date;
}

export interface UpdateJob {
  idJob: string;
  jobData: Job;
}

export interface JobsState {
  massage: string | null;
  loading: boolean;
  error: string | null;
}
