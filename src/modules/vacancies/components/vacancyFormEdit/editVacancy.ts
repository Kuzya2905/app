import { VacancyFormEditTypes } from "./VacancyFormEditTypes";

export const editVacancy = (dataForm: VacancyFormEditTypes, idJob: string) => {
  const newVacancy = {
    idJob,
    jobData: {
      name: dataForm.name,
      experience: dataForm.experience,
      mode: dataForm.mode,
      description: dataForm.description,
      requirements: dataForm.requirements,
      responsibilities: dataForm.responsibilities,
      termsAndConditions: dataForm.termsAndConditions,
      salary: dataForm.salary,
      qualification: dataForm.qualification,
      publishingSettings: dataForm.publishingSettings,
      other: dataForm.other,
    },
  };

  return newVacancy;
};
