import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeaderDemoTypes
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}
