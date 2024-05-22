'use client'

import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react"

import { FC } from "react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

import { LogoMain } from "@/assets/svgs/LogoMain";

import styles from "./mainScreen.module.scss";

const MainScreen: FC = () => {
  const router = useRouter();
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI(); 
  
  return (
  <main className={styles.mainContainer}>
    <div className={styles.pictureOne} />
    <div className={styles.blockHeader}>
      <div className={styles.blockWebThree}>
        <p className={styles.webThreeLabel}>WEB3</p>
        <p className={styles.webThreeText}>Recruitment Platform</p>
      </div>
      <div className={styles.blockMain}>
        <h1 className={styles.blockMainH}>Join the Thriving Teams in the</h1>
        <h1 className={styles.blockMainText}>TON Ecosystem</h1>
      </div>
      <div>
        <Button
          appearance="primary"
          size="l"
          className={styles.buttonAdd}
          onClick={() => {
            if (wallet) {
              router.push('/company-creation')
            } else {
              tonConnectUi.openModal()
            }              
          }}
        >
          Add company
        </Button> 
      </div>
    </div>
    <div className={styles.blockImg}>
      <LogoMain />
    </div>
    <div className={styles.pictureTwo} />
  </main>
)};

export default MainScreen;
