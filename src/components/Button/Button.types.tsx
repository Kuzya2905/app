import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface ButtonTypes
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
  appearance: "primary" | "ghost" | "secondary" | "tertiary" | "close" | "menu";
  size: 'xs' | "s" | "m" | "l" | "xl";
  typeBtn?: "button" | "submit" | "reset";
  iconSize?: number
  startIcon?: React.ReactElement | string | StaticImport;
  endIcon?: React.ReactElement | string | StaticImport;
}
