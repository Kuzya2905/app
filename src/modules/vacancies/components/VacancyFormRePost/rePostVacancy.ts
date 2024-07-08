import { VacancyFormRePostTypes } from "./VacancyFormRePost.types";

export const RePostVacancy = (
  dataForm: VacancyFormRePostTypes,
  idJob: string
) => {
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
      other: dataForm.other,
      published: true,
    },
  };

  return newVacancy;
};
