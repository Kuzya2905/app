import { configureStore } from "@reduxjs/toolkit";

import companiesReducers from "./features/companies/companiesReducers";
import jobsReducers from "./features/jobs/jobsReducers";

export const makeStore = () => {
  return configureStore({
    reducer: {
      companiesReducers,
      jobsReducers,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
