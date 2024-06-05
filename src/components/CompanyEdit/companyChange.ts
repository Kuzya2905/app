import { CompanyEditFormTypes } from "./CompanyEditFormTypes";

export const companyChange = (
  data: CompanyEditFormTypes,
  idCompany: number,
  userAddress: string
) => {
  const newCompany = {
    id: idCompany,
    logo: data.logo ?? "",
    title: data.title,
    nameLink: data.title,
    link: data.link,
    description: data.description,
    city: data.city ?? "",
    vacancyNumber: 0,
    sizeCompany: data.sizeCompany ?? "",
    industry: data.industry ?? "",
    walletAddress: userAddress,
    linksContact: [],
    telegram: data.telegram,
  };
  const companiesJSON = localStorage.getItem("CardsCompanies");
  const companies = companiesJSON && JSON.parse(companiesJSON);

  const newCompanies = companies.map((company: { id: number }) =>
    company.id === idCompany ? newCompany : company
  );

  localStorage.setItem("CardsCompanies", JSON.stringify(newCompanies));
};
