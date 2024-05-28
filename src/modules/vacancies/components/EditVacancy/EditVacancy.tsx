"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

import { VacancyFormEdit } from "@/modules/vacancies/components/vacancyFormEdit";
import { useIsConnectionRestored, useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";



export const EditVacancy = () => {
  const [isWalletLoaded, setIsWalletLoaded] = useState<boolean>(false);
  
  const wallet = useTonWallet();
  const router = useRouter();
  const connectionRestored = useIsConnectionRestored();
  
  useEffect(() => {
    if(connectionRestored) {
      if(!wallet) {
        router.push('/')
      } else {
        setIsWalletLoaded(true)
      }
    }    
  },[connectionRestored,wallet]);
  return (
    <>{
      isWalletLoaded ? (
        <div className={styles.creation}>
        <div className={styles.creationWrapper}>
          <div className={styles.wrapperBlockLinks}>
            <Link className={styles.blockLink} href="/">
              Main
            </Link>
            <span className={styles.blockSlash}>/</span>
            <Link className={styles.blockLink} href="/companies">
              Companies
            </Link>
            <span className={styles.blockSlash}>/</span>
            <Link className={styles.blockLinkCurrent} href={""}>
              Stellar
            </Link>
          </div>
          <h1 className={styles.title}>Job editing</h1>
          <VacancyFormEdit />
        </div>
      </div>
      ) : (
        <div className={styles.stub}></div>
      )
    }</>

)};
