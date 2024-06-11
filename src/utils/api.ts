import { Account, TonProofItemReplySuccess } from "@tonconnect/ui-react";

import {
  ApiEndpoints,
  TON_CENTER_URL,
  TON_CENTER_URL_TESTNET,
  IAddressBalance,
  COINGECKO_URL,
  IDollarExchangeRateData,
  IDollarExchangeRate,
  BACKEND_URL,
  IGenerationPayload,
} from "./types";
import { MutableRefObject } from "react";

export const getAddressBalance = async (
  userAddress: string
): Promise<IAddressBalance> => {
  try {
    const response = await fetch(
      `${TON_CENTER_URL}/${ApiEndpoints.GetAddressBalance}?address=${userAddress}`
    );
    if (!response.ok) {
      return { ok: false, result: "Network response was not ok" };
    }

    const data: IAddressBalance = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch rate:", err);
    return { ok: false, result: "Failed to fetch rate" };
  }
};

export const getDollarExchangeRate = async (): Promise<IDollarExchangeRate> => {
  try {
    const response = await fetch(
      `${COINGECKO_URL}/${ApiEndpoints.GetDollarExchangeRate}`
    );

    if (!response.ok) {
      return { ok: false, result: "Network response was not ok" };
    }

    const data: IDollarExchangeRateData = await response.json();
    return { ok: true, result: data["the-open-network"].usd };
  } catch (err) {
    console.error("Failed to fetch rate:", err);
    return { ok: false, result: "Failed to fetch rate" };
  }
};

export const generatePayload = async (): Promise<IGenerationPayload | null> => {
  try {
    const response = await (
      await fetch(`${BACKEND_URL}/${ApiEndpoints.GetGenerationPayload}`, {
        method: "POST",
      })
    ).json();
    return { tonProof: response.payload as string };
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
    const response = await (
      await fetch(`${BACKEND_URL}/${ApiEndpoints.GetAccessToken}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(reqBody),
      })
    ).json();

    if (response?.token) {
      localStorage.setItem(localStorageKey, response.token);
      accessToken.current = response.token;
    }
  } catch (e) {
    console.log("checkProof error:", e);
  }
};

export const getAccountInfo = async (accessToken: string | null) => {
  const response = await (
    await fetch(`${BACKEND_URL}/${ApiEndpoints.GetAccountInfo}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
  ).json();

  return response;
};
