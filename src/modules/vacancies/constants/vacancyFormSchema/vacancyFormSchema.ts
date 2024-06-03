import * as yup from "yup";

export const vacancyFormSchema = yup.object().shape({
  name: yup.string().required("Field is required").min(2, "Minimum 2 letters"),
  other: yup.string().required("Field is required"),
  qualification: yup.string().required("Field is required"),
  experience: yup.string().required("Field is required"),
  typeOfEmployment: yup.string().required("Field is required"),
  incomeLevel: yup.number().required("Field is required"),
  jobDescription: yup
    .string()
    .required("Field is required")
    .max(200, "Maximum 200 letters"),
  requirements: yup
    .string()
    .required("Field is required")
    .max(200, "Maximum 200 letters"),
  responsibilities: yup
    .string()
    .required("Field is required")
    .max(200, "Maximum 200 letters"),
  terms: yup
    .string()
    .required("Field is required")
    .max(200, "Maximum 200 letters"),
  publishingSettings: yup.string().required("Select one of the options"),
});
