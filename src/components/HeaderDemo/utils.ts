import { ConnectAdditionalRequest } from "@tonconnect/ui-react";
import { useEffect, useLayoutEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};

export const reset = (
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>,
  localStorageKey: string,
  generatePayload: Promise<ConnectAdditionalRequest | null>
) => {
  setAccessToken(null);
  localStorage.removeItem(localStorageKey);
  generatePayload;
};
