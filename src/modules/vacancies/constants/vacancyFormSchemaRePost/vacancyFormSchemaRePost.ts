import * as yup from "yup";

export const vacancyFormSchemaRePost = yup.object().shape({
  name: yup.string().required("Field is required").min(2, "Minimum 2 letters"),
  other: yup.string().required("Field is required"),
  qualification: yup.string().required("Field is required"),
  experience: yup.number().required("Field is required"),
  mode: yup.string().required("Field is required"),
  salary: yup.number().required("Field is required"),
  description: yup
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
  termsAndConditions: yup
    .string()
    .required("Field is required")
    .max(200, "Maximum 200 letters"),
});
