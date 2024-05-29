'use client'
import { useIsConnectionRestored, useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

const WithWalletCheck:React.FC<{
    children: JSX.Element 
    }> = ({children}) => {
        
        const wallet = useTonWallet();
        const router = useRouter();
        const pathname = usePathname()
        const connectionRestored = useIsConnectionRestored();
        const [loading, setloading] = useState(true)

        const URLList = ['/company/create', '/company/edit', 'vacancy/create', 'vacancy/edit'];

        useEffect(() => {
            if (connectionRestored) {  
                if (!wallet) {
                  const flag = URLList.some((e) => e === pathname)
                  if(flag) {
                    router.push('/');
                  } else {
                    setloading(false);
                  }
                }                
            }
        }, [wallet, pathname, loading, connectionRestored]);

        if (loading){
          return (
          <body></body>
          )
        }

        return children;
    };

export default WithWalletCheck

