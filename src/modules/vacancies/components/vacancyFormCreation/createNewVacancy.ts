import { VacancyFormCreationTypes } from "./VacancyFormCreationTypes";

export const createNewVacancy = (dataForm: VacancyFormCreationTypes) => {
  const vacanciesJSON = localStorage.getItem("CardsVacancies");
  const vacancies = vacanciesJSON && JSON.parse(vacanciesJSON);

  const companiesJSON = localStorage.getItem("CardsCompanies");
  const companies = companiesJSON && JSON.parse(companiesJSON);
  const dataCompany = companies[companies.length - 1];

  let currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  let futureDate = currentDate.toISOString();
  dataCompany.vacancyNumber = dataCompany.vacancyNumber + 1;

  localStorage.setItem("CardsCompanies", JSON.stringify([...companies]));

  const newVacancy = {
    idVacancy: vacancies[vacancies.length - 1].idVacancy + 1,
    idCompany: dataCompany.id,
    name: dataForm.name,
    experience: dataForm.experience,
    typeOfEmployment: dataForm.typeOfEmployment,
    city: dataCompany.city,
    description: dataForm.jobDescription,
    requirements: dataForm.requirements,
    responsibilities: dataForm.responsibilities,
    termsAndConditions: dataForm.terms,
    salary: dataForm.incomeLevel,
    company: dataCompany.title,
    logo: dataCompany.logo,
    date: new Date().toISOString(),
    expirationDate: futureDate,
  };

  localStorage.setItem(
    "CardsVacancies",
    JSON.stringify([...vacancies, newVacancy])
  );
};
