import { ReactElement } from "react";

export interface CompanyInfoTypes {
  dataCompany: {
    id: number;
    title: string;
    logo: string;
    nameLink: string;
    link: string;
    city: string;
    industry: string;
    sizeCompany: string;
    description: string;
    walletAddress: string;
    linksContact: {
      id: number;
      icon: ReactElement;
    }[];
  };
}
