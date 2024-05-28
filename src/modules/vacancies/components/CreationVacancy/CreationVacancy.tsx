"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useIsConnectionRestored, useTonWallet } from '@tonconnect/ui-react';
import { VacancyFormCreate } from "@/modules/vacancies/components/vacancyFormCreation";

import styles from "./styles.module.scss";

export const CreationVacancy = () => {

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
          <h1 className={styles.title}>Job creation</h1>
          <VacancyFormCreate />
        </div>
      </div>
      ) : (
        <div className={styles.stub}></div>
      )
    }</>

)};
