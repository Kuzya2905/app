"use client";
import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { PROTECTED_ROUTES } from "@/constants";

const ProtectedRoutes: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const wallet = useTonWallet();
  const connectionRestored = useIsConnectionRestored();
  const [tonConnectUi] = useTonConnectUI();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connectionRestored) {
      if (!wallet) {
        const isProtected = Object(PROTECTED_ROUTES)[pathname];
        isProtected ? router.push("/") : setLoading(false);
      } else {
        // tonConnectUi.account?.chain === "-3" ? tonConnectUi.disconnect() : null;
        setLoading(false);
      }
    }
  }, [wallet, router, pathname, loading, connectionRestored]);

  if (loading) {
    return <body></body>;
  }

  return children;
};

export default ProtectedRoutes;
