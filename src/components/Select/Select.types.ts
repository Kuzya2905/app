import { DetailedHTMLProps, HTMLAttributes } from "react";

export enum VARIANT {
  SMALL = "small",
  BIG = "big",
}

export interface SelectTypes
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  objValue: { value: string } | string | undefined | null | number;
  onChange: (...event: any[]) => void;
  data?: {
    value: number | string;
    label: string;
  }[];
  placeholder: string;
  variant?: string;
  enteredValueColor?: string;
  error?: any;
  valueDefault?: string | number;
}
