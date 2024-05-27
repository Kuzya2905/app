"use client";

import React, { useState, useEffect } from "react";
import cn from "classnames";
import LinkNext from "next/link";
import { TonConnectButton } from "@tonconnect/ui-react";

import Link from "@/components/Link/Link";
import { LinksArr } from "./HeaderData";
import { HeaderDemoTypes } from "@/components/HeaderDemo/Header.types";

import { Logo } from "@/assets/svgs/Logo";
import { Burger } from "@/assets/svgs/Burger";
import { Cross } from "@/assets/svgs/Cross";

import styles from "./headerDemo.module.scss";

const HeaderDemo: React.FC<HeaderDemoTypes> = ({
  wide = false,
  className,
  ...props
}) => {
  const [activeBurger, setActiveBurger] = useState(false);

  const toggleBurger = () => {
    setActiveBurger((prev) => !prev);
  };

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

  return (
    <header className={styles.headerDemoMain}>
      <div
        className={cn(className, styles.headerDemoWrapper, {
          [styles.wide]: wide,
        })}
        {...props}
      >
        <LinkNext href="/">
          <div className={styles.headerDemoLogoContainer}>
            <div className= {styles.logoWrapper}>
              <Logo />
            </div>            
            <span className={styles.logoText}>decentral job</span>
          </div>
        </LinkNext>
        <div
          className={cn(styles.headerDemo, { [styles.active]: activeBurger })}
        >
          <div className={styles.headerLinks}>
            {LinksArr.map(({ id, text, withCount, disabled, count, link }) => (
              <Link
                key={id}
                count={count}
                withCount={withCount}
                disabled={disabled}
                link={link}
              >
                {text}
              </Link>
            ))}
          </div>
          <div className={styles.buttonConnectWalletWrapper}>
            <TonConnectButton/>      
          </div>
        </div>
        {activeBurger ? (
          <div onClick={toggleBurger} className={styles.headerDemoCross}>
            <Cross />
          </div>
        ) : (
          <div className={styles.headerDemoBurger} onClick={toggleBurger}>
            <Burger />
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderDemo;
