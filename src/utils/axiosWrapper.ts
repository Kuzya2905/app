import axios from "axios";

import { BACKEND_URL, COINGECKO_URL } from "./types";

export const axiosBackend = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosCoinGecko = axios.create({
  baseURL: COINGECKO_URL,
  headers: {
    Accept: "application/json",
  },
});
