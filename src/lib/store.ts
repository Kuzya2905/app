import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import createCompanyReducer from "./features/createCompany/createCompanySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiService.reducerPath]: apiService.reducer,
      createCompany: createCompanyReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiService.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
