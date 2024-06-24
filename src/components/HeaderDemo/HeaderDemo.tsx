"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import cn from "classnames";
import LinkNext from "next/link";
import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

import Link from "@/components/Link/Link";
import { LinksArr } from "./HeaderData";
import Button from "@/components/Button/Button";
import UserMenu from "@/modules/UserMenu/components/UserMenu/UserMenu";
import useIsScreenWidthLessThan from "@/modules/hooks/useIsScreenWidthLessThan";
import { checkProof, generatePayload } from "@/utils/api";
import { reset, useInterval } from "./utils";

import { HeaderDemoTypes } from "@/components/HeaderDemo/Header.types";

import { Logo } from "@/assets/svgs/Logo";
import { Burger } from "@/assets/svgs/Burger";
import { Cross } from "@/assets/svgs/Cross";

import styles from "./headerDemo.module.scss";
import axios from "axios";

const HeaderDemo: React.FC<HeaderDemoTypes> = ({ className, ...props }) => {
  const [activeBurger, setActiveBurger] = useState(false);

  const [tonConnectUi] = useTonConnectUI();
  const [isWalletLoaded, setIsWalletLoaded] = useState<boolean>(false);
  const connectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const firstProofLoading = useRef<boolean>(true);

  const localStorageKey = "demo-api-access-token";
  const accessToken = useRef<string | null>(
    localStorage.getItem(localStorageKey)
  );
  const [currentToken, setCurrentToken] = useState(
    localStorage.getItem(localStorageKey)
  );

  const IsScreenMobile = useIsScreenWidthLessThan(1025);
  const refreshIntervalMs = 9 * 60 * 1000;

  const toggleBurger = () => {
    setActiveBurger((prev) => !prev);
  };

  useEffect(() => {
    if (connectionRestored) {
      if (wallet) {
        setIsWalletLoaded(true);
      } else {
        setIsWalletLoaded(false);
      }
    }
  }, [connectionRestored, wallet]);

  useEffect(() => {
    const changeBodyPosition = () => {
      if (activeBurger) {
        document.querySelector("body")?.style.setProperty("position", "fixed");
      } else
        document
          .querySelector("body")
          ?.style.setProperty("position", "relative");
    };
    changeBodyPosition();
  }, [activeBurger]);

  const recreateProofPayload = useCallback(async () => {
    if (firstProofLoading.current) {
      tonConnectUI.setConnectRequestParameters({ state: "loading" });
      firstProofLoading.current = false;
    }

    const payload = await generatePayload();

    if (payload) {
      tonConnectUI.setConnectRequestParameters({
        state: "ready",
        value: payload,
      });
    } else {
      tonConnectUI.setConnectRequestParameters(null);
    }
  }, [tonConnectUI, firstProofLoading]);

  if (firstProofLoading.current) {
    recreateProofPayload();
  }

  useInterval(recreateProofPayload, refreshIntervalMs);

  useEffect(
    () =>
      tonConnectUI.onStatusChange(async (w) => {
        if (!w) {
          reset(accessToken, localStorageKey, generatePayload());
          return;
        }

        if (w.connectItems?.tonProof && "proof" in w.connectItems.tonProof) {
          await checkProof(
            w.connectItems.tonProof.proof,
            w.account,
            localStorageKey,
            accessToken
          );
        }
        if (!accessToken.current) {
          tonConnectUI.disconnect();
          return;
        }
        setCurrentToken(accessToken.current);
      }),
    [tonConnectUI]
  );

  return (
    <header className={styles.headerDemoMain}>
      <div className={styles.headerDemoWrapper} {...props}>
        <LinkNext href="/">
          <div className={styles.headerDemoLogoContainer}>
            <div className={styles.logoWrapper}>
              <Logo />
            </div>
            <span className={styles.logoText}>decentral job</span>
          </div>
        </LinkNext>
        <div
          className={cn(styles.headerDemo, {
            [styles.active]: activeBurger && !isWalletLoaded,
          })}
        >
          <div className={styles.headerLinks}>
            {LinksArr.map(
              ({ id, text, withCount, disabled, count, link, logoUrl }) => (
                <Link
                  className={styles.linkItem}
                  key={id}
                  count={count}
                  withCount={withCount}
                  disabled={disabled}
                  link={link}
                  logoUrl={IsScreenMobile ? logoUrl : ""}
                  fontSize={IsScreenMobile ? "s" : null}
                >
                  {text}
                </Link>
              )
            )}
          </div>
          <div className={styles.buttonConnectWalletWrapper}>
            {!isWalletLoaded && (
              <Button
                appearance="secondary"
                size="l"
                type="submit"
                onClick={() => {
                  tonConnectUi.openModal();
                }}
              >
                Connect wallet
              </Button>
            )}
          </div>
        </div>
        {activeBurger ? (
          <>
            {isWalletLoaded ? (
              <UserMenu currentToken={currentToken} />
            ) : (
              <div onClick={toggleBurger} className={styles.headerDemoBurger}>
                <Cross />
              </div>
            )}
          </>
        ) : (
          <>
            {isWalletLoaded ? (
              <UserMenu currentToken={currentToken} />
            ) : (
              <div className={styles.headerDemoBurger} onClick={toggleBurger}>
                <Burger />
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderDemo;
