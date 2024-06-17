import { combineReducers } from "@reduxjs/toolkit";

import createJobReducer from "@/lib/features/jobs/createJob/createJobSlice";
import deleteAllJobsReducer from "@/lib/features/jobs/deleteAllJobs/deleteAllJobsSlice";
import deleteJobReducer from "@/lib/features/jobs/deleteJob/deleteJobSlice";
import findAllJobsReducer from "@/lib/features/jobs/findAllJobs/findAllJobsSlice";
import findOneJobsReducer from "@/lib/features/jobs/findOneJob/findOneJobSlice";
import updateJobReducer from "@/lib/features/jobs/updateJob/updateJobSlice";

const jobsReducers = combineReducers({
  createJob: createJobReducer,
  deleteAllJobs: deleteAllJobsReducer,
  deleteJob: deleteJobReducer,
  findAllJobs: findAllJobsReducer,
  findOneJobs: findOneJobsReducer,
  updateJob: updateJobReducer,
});

export default jobsReducers;
