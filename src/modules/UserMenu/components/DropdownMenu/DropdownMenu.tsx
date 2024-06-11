"use client";
import { useEffect, useRef, useState } from "react";
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import LinkNext from "next/link";
import Image from "next/image";
import cn from "classnames";

import Link from "@/components/Link/Link";
import { getAccountInfo, getDollarExchangeRate } from "@/utils/api";
import { LinksArr } from "@/components/HeaderDemo/HeaderData";
import useIsScreenWidthLessThan from "@/modules/hooks/useIsScreenWidthLessThan";
import Button from "@/components/Button/Button";
import { useInterval } from "@/components/HeaderDemo/utils";

import { DropdownMenuTypes } from "./dropdownMenu.types";

import LogoEmpty from "@/assets/svgs/logoEmpty.svg";
import Publish from "@/assets/svgs/Publish.svg";
import LogOut from "@/assets/svgs/LogOut.svg";
import TonIcon from "@/assets/svgs//TonIcon.svg";

import styles from "./dropdownMenu.module.scss";

const DropdownMenu: React.FC<DropdownMenuTypes> = ({ menuIsOpen }) => {
  const userAddress = useTonAddress();
  const [tonConnectUi] = useTonConnectUI();

  const [balance, setBalance] = useState<number | null>(0);
  const [dollarExchangeRate, setDollarExchangeRate] = useState<number | null>(
    null
  );
  const localStorageKey = "demo-api-access-token";
  const accessToken = useRef<string | null>(null);
  const wallet = useTonWallet();

  const IsScreenMobile = useIsScreenWidthLessThan(1025);

  const refreshIntervalMs = 60 * 1000;

  accessToken.current = localStorage.getItem(localStorageKey);

  const getBalance = async () => {
    if (accessToken.current) {
      const data = await getAccountInfo(accessToken.current);
      setBalance(
        data && data.account
          ? Number(data.account.balance.coins) / 1000000000
          : null
      );
    }
  };

  useEffect(() => {
    getBalance();
  }, [accessToken]);

  const getDollar = async () => {
    const data = await getDollarExchangeRate();
    console.log(data);
    console.log(data.ok);
    if (data && data.ok) {
      const exchangeRate = Number(data.result);
      localStorage.setItem("dollar-exchange-rate", String(exchangeRate));
      setDollarExchangeRate(exchangeRate);
    } else setDollarExchangeRate(null);
  };

  useEffect(() => {
    const exchangeRate = localStorage.getItem("dollar-exchange-rate");
    setDollarExchangeRate(Number(exchangeRate));
    if (!exchangeRate) {
      getDollar();
    }
  }, [dollarExchangeRate]);

  useInterval(getDollar, refreshIntervalMs);

  return (
    <div
      className={cn(styles.dropdownMenu, {
        [styles.active]: menuIsOpen,
      })}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.header}>
        <div className={styles.imgWrapper}>
          <Image
            className={styles.logoEmpty}
            src={wallet && "imageUrl" in wallet ? wallet.imageUrl : LogoEmpty}
            priority
            alt="LogoEmpty"
            width={64}
            height={64}
          />
        </div>
        <div className={styles.userAddressWrapper}>
          <h3 className={styles.userAddress}>{`${userAddress.slice(
            0,
            4
          )}...${userAddress.slice(userAddress.length - 4)}`}</h3>
          <LinkNext className={styles.headerLink} href={"/"}>
            Перейти в профиль
          </LinkNext>
        </div>
      </div>
      <div className={styles.balanceWrapper}>
        <h3 className={styles.balanceTitle}>Ваш баланс</h3>
        <div className={styles.balance}>
          <Image
            className={styles.balanceIcon}
            src={TonIcon}
            priority
            alt="TonIcon"
            width={16}
            height={16}
          />
          <span className={styles.balanceTon}>
            {balance ? balance.toFixed(2) : 0}
          </span>
          <span className={styles.exchangeRates}>
            {balance && dollarExchangeRate
              ? "≈ " + (balance * dollarExchangeRate).toFixed(2) + "$"
              : "Loading"}
          </span>
        </div>
      </div>
      <div className={styles.menuList}>
        <Link
          className={styles.menuListItem}
          key={null}
          count={0}
          withCount={false}
          disabled={false}
          link={"/vacancy/create"}
          logoUrl={Publish}
          fontSize="s"
        >
          Publish
        </Link>

        {IsScreenMobile &&
          LinksArr.map(
            ({ id, text, withCount, disabled, count, link, logoUrl }) => (
              <Link
                className={styles.menuListItem}
                key={id}
                count={count}
                withCount={withCount}
                disabled={disabled}
                link={link}
                logoUrl={logoUrl}
                fontSize="s"
              >
                {text}
              </Link>
            )
          )}

        <Button
          appearance="menu"
          size="xs"
          type="button"
          startIcon={LogOut}
          iconSize={24}
          onClick={() => tonConnectUi.disconnect()}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default DropdownMenu;
