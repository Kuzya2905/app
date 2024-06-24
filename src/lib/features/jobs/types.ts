import { CreatedJob } from "./createJob/createJob.types";
import { JobsState } from "./findAllJobs/findAllJobs.types";
import { JobState } from "./findOneJob/findOneJob.types";
import { UpdatedJob } from "./updateJob/updateJobs.types";

export interface JobsReducersTypes {
  jobsReducers: {
    findAllJobs: JobsState;
    findOneJob: JobState;
    createJob: CreatedJob;
    updateJob: UpdatedJob;
  };
}
