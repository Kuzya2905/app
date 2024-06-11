import { ConnectAdditionalRequest } from "@tonconnect/ui-react";
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from "react";

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
  accessToken: MutableRefObject<string | null>,
  localStorageKey: string,
  generatePayload: Promise<ConnectAdditionalRequest | null>
) => {
  accessToken.current = null;
  localStorage.removeItem(localStorageKey);
  generatePayload;
};
