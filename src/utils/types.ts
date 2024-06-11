export const TON_CENTER_URL = "https://toncenter.com/api/v2";
export const TON_CENTER_URL_TESTNET = "https://testnet.toncenter.com/api/v2";
export const COINGECKO_URL = "https://api.coingecko.com/api/v3";
export const BACKEND_URL = "http://localhost:8080";

export enum ApiEndpoints {
  GetAddressBalance = "getAddressBalance",
  GetDollarExchangeRate = "simple/price?ids=the-open-network&vs_currencies=usd",
  GetGenerationPayload = "api/ton/generate-payload",
  GetAccessToken = "api/ton/check-proof",
  GetAccountInfo = "api/ton/get-account-info",
}

export interface IAddressBalance {
  ok: boolean;
  result: string;
}

export interface IDollarExchangeRateData {
  "the-open-network": {
    usd: number;
  };
}

export interface IGenerationPayload {
  tonProof: string;
}

export interface IDollarExchangeRate {
  ok: boolean;
  result: number | string;
}
