import { JobsState } from "./findAllJobs/findAllJobs.types";
import { JobState } from "./findOneJob/findOneJob.types";

export interface JobsReducersTypes {
  jobsReducers: {
    findAllJobs: JobsState;
    findOneJob: JobState;
  };
}
