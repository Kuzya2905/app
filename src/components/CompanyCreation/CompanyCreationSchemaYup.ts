import * as yup from "yup";

export const schema = yup.object().shape({
  logo: yup.string().nullable().url("Link must be a valid URL"),
  title: yup
    .string()
    .required("Field is required")
    .min(2, "Company name must be at least 2 characters long"),
  link: yup
    .string()
    .required("Field is required")
    .min(2, "Web site must be at least 2 characters long"),
  description: yup
    .string()
    .nullable()
    .required("Field is required")
    .max(500, "Description must not be longer than 500 characters"),
  telegram: yup
    .string()
    .nullable()
    .matches(
      /^$|^t\.me\/[a-zA-Z0-9_]{0,}$/,
      "Must start with 't.me/' followed by your username"
    )
    .required("Field is required"),
});
