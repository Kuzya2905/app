export interface Job {
  idCompany: String;
  id?: string;
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

export interface CreatedJob {
  jobCreated: Job | null;
  loading: boolean;
  error: string | null;
}
