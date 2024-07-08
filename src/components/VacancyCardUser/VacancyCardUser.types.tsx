import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface VacancyCardUserTypes
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name: string;
  experience: number;
  city: string;
  salary: number;
  className?: string;
  typeOfEmployment: string;
  idCompany: string;
  valueActiveTab: string;
  activateNotification: (messageNotification: string) => void;
}

export interface OptionDropDownType {
  name: string;
}
