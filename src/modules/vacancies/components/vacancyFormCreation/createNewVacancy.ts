import { Company } from "@/lib/features/companies/findOneCompany/findOneCompany.types";
import { VacancyFormCreationTypes } from "./VacancyFormCreationTypes";

export const createNewVacancy = (
  dataForm: VacancyFormCreationTypes,
  dataCompany: Company
) => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);

  const newVacancy = {
    idCompany: dataCompany.id,
    name: dataForm.name,
    experience: dataForm.experience,
    mode: dataForm.mode,
    city: dataCompany.city,
    description: dataForm.description,
    requirements: dataForm.requirements,
    responsibilities: dataForm.responsibilities,
    termsAndConditions: dataForm.termsAndConditions,
    salary: dataForm.salary,
    qualification: dataForm.qualification,
    nameCompany: dataCompany.title,
    logo: dataCompany.logo,
    expirationDate: currentDate,
    publishingSettings: dataForm.publishingSettings,
    other: dataForm.other,
  };

  return newVacancy;
};
