'use client'
import { useIsConnectionRestored, useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { PROTECTED_ROUTES } from '@/constants';

const WithWalletCheck:React.FC<{
    children: JSX.Element 
    }> = ({children}) => {        
      const wallet = useTonWallet();
      const router = useRouter();
      const pathname = usePathname();
      const connectionRestored = useIsConnectionRestored();
      const [loading, setloading] = useState(true);

        useEffect(() => {
            if (connectionRestored) { 
                if (!wallet) {
                  const isProtected = Object(PROTECTED_ROUTES)[pathname];
                  if(isProtected) { 
                    router.push('/');  
                  } else {
                    setloading(false);
                  }
                } else {
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

export default WithWalletCheck

