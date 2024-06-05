import { VacancyFormEditTypes } from "./VacancyFormEditTypes";

export const editVacancy = (
  dataForm: VacancyFormEditTypes,
  vacancyId: number
) => {
  const vacanciesJSON = localStorage.getItem("CardsVacancies");
  const vacancies = vacanciesJSON && JSON.parse(vacanciesJSON);

  const companiesJSON = localStorage.getItem("CardsCompanies");
  const companies = companiesJSON && JSON.parse(companiesJSON);
  const dataCompany = companies[companies.length - 1];

  let currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  let futureDate = currentDate.toISOString();

  localStorage.setItem("CardsCompanies", JSON.stringify([...companies]));

  const newVacancy = {
    idVacancy: vacancyId,
    idCompany: dataCompany.id,
    name: dataForm.name,
    experience: dataForm.experience,
    typeOfEmployment: dataForm.typeOfEmployment,
    city: dataCompany.city,
    description: dataForm.description,
    requirements: dataForm.requirements,
    responsibilities: dataForm.responsibilities,
    termsAndConditions: dataForm.termsAndConditions,
    salary: dataForm.salary,
    qualification: dataForm.qualification,
    company: dataCompany.company,
    logo: dataCompany.logo,
    date: new Date().toISOString(),
    expirationDate: futureDate,
    publishingSettings: dataForm.publishingSettings,
    other: dataForm.other,
  };

  const newVacancies = vacancies.map((vacancy: { idVacancy: number }) =>
    vacancy.idVacancy === vacancyId ? newVacancy : vacancy
  );

  localStorage.setItem("CardsVacancies", JSON.stringify(newVacancies));
};
