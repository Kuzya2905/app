import React from "react";
import cn from "classnames";
import LinkNext from "next/link";
import Image from "next/image";

import { LinkTypes } from "@/components/Link/Link.types";

import styles from "./link.module.scss";

const Link: React.FC<LinkTypes> = ({
  className,
  withCount = false,
  disabled = false,
  count,
  children,
  logoUrl = "",
  link = "",
  fontSize = null,
  ...props
}) => (
  <LinkNext className ={className} href={`${link}`}>
    <div
      className={cn(styles.headerLink, {
        [styles.disabled]: disabled,
      })}
      {...props}
    > 
      <div className={styles.content}>
        {
          logoUrl && (
            <Image
              className={styles.logo}
              src={logoUrl}
              priority
              alt="LogoLink" 
              width={24}
              height={24}
            />
          )
        }
        <span
          className={cn(styles.headerLinkText, {
            [styles.disabled]: disabled,
            [styles.withCount]: withCount,
            [styles.s]: fontSize === "s",
          })}
        >
          {children}
        </span>
      </div>
        
        {withCount && (
          <div className={cn(styles.headerLinkCount)}>
            <span className={styles.LinkCountText}>{count}</span>
          </div>
        )}
    </div>
  </LinkNext>
);

export default Link;
