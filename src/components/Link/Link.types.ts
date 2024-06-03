import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface LinkTypes
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  withCount: boolean;
  disabled: boolean;
  link?: string;
  logoUrl?: string
  count: number | null;
  children: ReactNode;
  fontSize?: "s" | "m" | "l" | "xl" | null;
}
