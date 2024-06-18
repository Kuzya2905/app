"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import cn from "classnames";
import LinkNext from "next/link";
import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useDispatch } from "react-redux";

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

import { createCompanyThunk } from "@/lib/features/companies/createCompany/createCompanyThunk";
import { AppDispatch } from "@/lib/store";
import { findAllCompaniesThunk } from "@/lib/features/companies/findAllCompanies/findAllCompaniesThunk";
import { deleteAllCompaniesThunk } from "@/lib/features/companies/deleteAllCompanies/deleteAllCompaniesThunk";
import findOneCompanyThunk from "@/lib/features/companies/findOneCompany/findOneCompanyThunk";
import updateCompanyThunk from "@/lib/features/companies/updateCompany/updateCompanyThunk";
import deleteCompanyThunk from "@/lib/features/companies/deleteCompany/deleteCompanyThunk";
import { createJobThunk } from "@/lib/features/jobs/createJob/createJobThunk";
import { deleteAllJobsThunk } from "@/lib/features/jobs/deleteAllJobs/deleteAllJobsThunk";
import deleteJobThunk from "@/lib/features/jobs/deleteJob/deleteJobThunk";
import { findAllJobsThunk } from "@/lib/features/jobs/findAllJobs/findAllJobsThunk";
import findOneJobThunk from "@/lib/features/jobs/findOneJob/findOneJobThunk";
import updateJobThunk from "@/lib/features/jobs/updateJob/updateJobThunk";

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
  const refreshIntervalMs = 30 * 1000;

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

  const dispatch = useDispatch<AppDispatch>();

  const createCompany = () => {
    dispatch(
      createCompanyThunk({
        logo: "https://cdn.getro.com/companies/1df17e37-856f-543e-a964-1b2f51f1d305",
        title: "Tonstakers",
        description:
          "Get yields securely, equally and transparently at best rates on the market. Keep access to your staked asset at all times. Deposit TON, we'll do the rest.",
        city: "Dubai",
        vacancyNumber: 7,
        sizeCompany: "1 - 50",
        industry: "IT",
        contactLinks: {
          telegram: "https://tonstakers.com/",
          twitter: "https://tonstakers.com/",
          site: "https://tonstakers.com/",
        },
      })
    );
  };

  const getAllCompanies = () => {
    dispatch(findAllCompaniesThunk());
  };

  const deleteAllCompanies = () => {
    dispatch(deleteAllCompaniesThunk());
  };

  const getCompany = () => {
    dispatch(findOneCompanyThunk("666fea2e3359553f80e9a412"));
  };

  const updateCompany = () => {
    dispatch(
      updateCompanyThunk({
        idCompany: "667018d99e62e843a0eca3e2",
        companyData: {
          logo: "https://cdn.getro.com/companies/1df17e37-856f-543e-a964-1b2f51f1d305",
          title: "11111",
          description:
            "Get yields securely, equally and transparently at best rates on the market. Keep access to your staked asset at all times. Deposit TON, we'll do the rest.",
          city: "111111",
          vacancyNumber: 1,
          sizeCompany: "1 - 50",
          industry: "11111",
          contactLinks: {
            telegram: "https://tonstakers.com/",
            twitter: "https://tonstakers.com/",
            site: "https://tonstakers.com/",
          },
        },
      })
    );
  };

  const deleteCompany = () => {
    dispatch(deleteCompanyThunk("667031fdb7120f3450cfd3d9"));
  };

  const createJob = () => {
    dispatch(
      createJobThunk({
        idCompany: "66703155b7120f3450cfd3cb",
        name: "aaaa",
        experience: 3,
        mode: "Remote",
        city: "aaa",
        description:
          "As a Senior Frontend Engineer at Tonstakers, you will play a critical role in shaping the future of our platform. You will collaborate closely with our dedicated design, product, and development teams to deliver outstanding user experiences.",
        salary: 10000,
        logo: "https://cdn.getro.com/companies/1df17e37-856f-543e-a964-1b2f51f1d305",
      })
    );
  };

  const deleteAllJobs = () => {
    dispatch(deleteAllJobsThunk());
  };

  const deleteJob = () => {
    dispatch(deleteJobThunk("6670192e9e62e843a0eca3e7"));
  };

  const getAllJobs = () => {
    dispatch(findAllJobsThunk());
  };

  const getJob = () => {
    dispatch(findOneJobThunk("66718057ef1fac3df786fe43"));
  };

  const updateJob = () => {
    dispatch(
      updateJobThunk({
        idJob: "6670192e9e62e843a0eca3e7",
        jobData: {
          name: "nnnnnnn",
          experience: 3,
          mode: "nnnnnn",
          city: "nnnnnn",
          description:
            "As a Senior Frontend Engineer at Tonstakers, you will play a critical role in shaping the future of our platform. You will collaborate closely with our dedicated design, product, and development teams to deliver outstanding user experiences.",
          salary: 23232323,
          logo: "https://cdn.getro.com/companies/1df17e37-856f-543e-a964-1b2f51f1d305",
        },
      })
    );
  };

  return (
    <header className={styles.headerDemoMain}>
      <button onClick={() => deleteAllCompanies()}>Запрос на бэк</button>
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
