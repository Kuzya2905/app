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

export const transformValueExperience = (experience: number) => {
  const obj = {
    6: "No experience",
    5: "Experience over 5 years",
  };
  return experience === 6 || experience === 5
    ? obj[experience]
    : experience === 1
    ? `Experience from ${experience} year`
    : `Experience from ${experience} years`;
};
