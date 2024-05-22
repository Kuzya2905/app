import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonTypes
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  appearance: "primary" | "ghost" | "secondary" | "tertiary";
  size: "s" | "m" | "l" | "xl";
  typeBtn?: "button" | "submit" | "reset";
  iconPosition?: string;
  iconСross?: boolean;
}
