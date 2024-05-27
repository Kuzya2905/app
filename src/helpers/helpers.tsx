import { format } from "date-fns";

export const yearDeclensionRu = (count: number) => {
  const lastNumber = Number(String(count)[String(count).length - 1]);
  if (lastNumber === 1 && count !== 11) {
    return `${count} года`;
  } else return `${count} лет`;
};

export const pluralizationEn = (text: string, count: number): string =>
  ` ${count} ${text}${count !== 1 ? "s" : ""}`;

export const yearDeclensionEn = (count: number): string =>
  `${count} year${count !== 1 ? "s" : ""}`;

export const convertISOToDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return format(date, "dd.MM.yyyy");
};

export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .concat(" $");

export const getYear = () => new Date().getFullYear();

export const isFirstCharDigit = (str: string) => /^\d/.test(str);
