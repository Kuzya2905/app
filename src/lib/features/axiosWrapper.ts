import axios from "axios";

import { BACKEND_URL } from "./types";

export const axiosBackend = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
