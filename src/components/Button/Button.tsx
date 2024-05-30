import React, { JSX } from "react";
import cn from "classnames";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import { ButtonTypes } from "@/components/Button/Button.types";

import CrossButton from "@/assets/svgs/CrossButton.svg";

import styles from "./Button.module.scss";

const Button = ({
  children,
  appearance,
  className,
  disabled = false,
  type = "button",
  size,
  startIcon,
  endIcon,
  iconSize=20,
  ...props
}: ButtonTypes): JSX.Element => {
  const renderIcon = (icon?: React.ReactElement | string | StaticImport) => {
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === "object" && "src" in icon) {
      return <Image src={icon} alt="icon" width={iconSize} height={iconSize} />;
    }
    return null;
  };

  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(styles.button, className, {
        [styles.primary]: appearance === "primary",
        [styles.ghost]: appearance === "ghost",
        [styles.secondary]: appearance === "secondary",
        [styles.tertiary]: appearance === "tertiary",
        [styles.close]: appearance === "close",
        [styles.menu] : appearance === "menu",
        [styles.xs]: size === "xs",
        [styles.s]: size === "s",
        [styles.m]: size === "m",
        [styles.l]: size === "l",
        [styles.xl]: size === "xl",
      })}
      {...props}
    >
      {startIcon && (
        <div className={styles.startIcon}>{renderIcon(startIcon)}</div>
      )}
      {appearance === "close" ? (
        <Image src={CrossButton} alt="Cross-button" width={20} height={20} />
      ) : (
        children
      )}
      {endIcon && <div className={styles.endIcon}>{renderIcon(endIcon)}</div>}
    </button>
  );
};

export default React.memo(Button);
