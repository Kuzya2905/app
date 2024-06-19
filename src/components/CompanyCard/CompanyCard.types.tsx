import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CompanyCardTypes
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  logo: string;
  title: string;
  description: string;
  city: string;
  vacancyNumber?: number;
}
