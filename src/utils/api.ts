import { MutableRefObject } from "react";
import { Account, TonProofItemReplySuccess } from "@tonconnect/ui-react";

import { axiosBackend, axiosCoinGecko } from "./axiosWrapper";

import {
  ApiEndpoints,
  IDollarExchangeRateData,
  IDollarExchangeRate,
  IGenerationPayload,
} from "./types";

export const getDollarExchangeRate = async (): Promise<IDollarExchangeRate> => {
  try {
    const response = await axiosCoinGecko(
      `${ApiEndpoints.GetDollarExchangeRate}`
    );
    if (response.status !== 200) {
      return { ok: false, result: "Network response was not ok" };
    }
    const data: IDollarExchangeRateData = await response.data;
    return { ok: true, result: data["the-open-network"].usd };
  } catch (err) {
    console.error("Failed to fetch rate:", err);
    return { ok: false, result: "Failed to fetch rate" };
  }
};

export const generatePayload = async (): Promise<IGenerationPayload | null> => {
  try {
    const response = await axiosBackend.post(
      `${ApiEndpoints.GetGenerationPayload}`
    );
    return { tonProof: response.data.payload as string };
  } catch {
    return null;
  }
};

export const checkProof = async (
  proof: TonProofItemReplySuccess["proof"],
  account: Account,
  localStorageKey: string,
  accessToken: MutableRefObject<string | null>
): Promise<void> => {
  try {
    const reqBody = {
      address: account.address,
      network: account.chain,
      public_key: account.publicKey,
      proof: {
        ...proof,
        state_init: account.walletStateInit,
      },
    };
    const response = await axiosBackend.post(
      `${ApiEndpoints.GetAccessToken}`,
      reqBody
    );

    if (response.data.token) {
      localStorage.setItem(localStorageKey, response.data.token);
      accessToken.current = response.data.token;
    }
  } catch (e) {
    console.log("checkProof error:", e);
  }
};

export const getAccountInfo = async (accessToken: string | null) => {
  const response = await axiosBackend(`${ApiEndpoints.GetAccountInfo}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
