'use client'
import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { PROTECTED_ROUTES } from '@/constants';

const ProtectedRoutes:React.FC<{
    children: JSX.Element 
    }> = ({children}) => {     
      const router = useRouter();
      const pathname = usePathname();

      const wallet = useTonWallet();
      const connectionRestored = useIsConnectionRestored();
      const [tonConnectUi] = useTonConnectUI();
      
      const [loading, setloading] = useState(true);

        useEffect(() => {
            if (connectionRestored) { 
                if (!wallet) {
                  const isProtected = Object(PROTECTED_ROUTES)[pathname];
                  isProtected ? router.push('/') : setloading(false);
                } else {
                  //tonConnectUi.account?.chain === '-3' ? tonConnectUi.disconnect() : null;
                  setloading(false);
                }               
            }
        }, [wallet, pathname, loading, connectionRestored]);

        if (loading){
          return (
          <body>
          </body>
          )
        }

        return children;
    };

export default ProtectedRoutes

