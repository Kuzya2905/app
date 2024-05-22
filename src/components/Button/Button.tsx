import React, { JSX } from "react";
import cn from "classnames";
import Image from "next/image";

import CrossButton from "@/assets/svgs/CrossButton.svg";

import { ButtonTypes } from "@/components/Button/Button.types";

import { IconButton } from "@/assets/svgs/IconButton";

import styles from "./Button.module.scss";

const Button = ({
  children,
  appearance,
  className,
  disabled = false,
  type = "button",
  size,
  iconPosition = "",
  iconСross = false,
  ...props
}: ButtonTypes): JSX.Element => (
  <button
    disabled={disabled}
    type={type}
    className={cn(styles.button, className, {
      [styles.primary]: appearance === "primary",
      [styles.ghost]: appearance === "ghost",
      [styles.secondary]: appearance === "secondary",
      [styles.tertiary]: appearance === "tertiary",
      [styles.s]: size === "s",
      [styles.m]: size === "m",
      [styles.l]: size === "l",
      [styles.xl]: size === "xl",
      [styles.buttonWithIcon]: iconPosition,
      [styles.buttonCross]: iconСross,
    })}
    {...props}
  >
    <div
      className={cn(styles.iconButton, className, {
        [styles.iconLeft]: iconPosition === "left",
      })}
    >
      <IconButton />
    </div>
    {iconСross ? <Image src={CrossButton} alt={"Cross-button"} /> : children}
    <div
      className={cn(styles.iconButton, className, {
        [styles.iconRight]: iconPosition === "right",
      })}
    >
      <IconButton />
    </div>
  </button>
);

export default React.memo(Button);
