import * as yup from "yup";

export const schema = yup.object().shape({
  logo: yup.string().nullable().url("Link must be a valid URL"),
  title: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters long"),
  link: yup
    .string()
    .required("Web site is required")
    .min(2, "Web site must be at least 2 characters long"),
  description: yup
    .string()
    .required("Company Description is required")
    .max(500, "Description must not be longer than 500 characters"),
  telegram: yup
    .string()
    .matches(
      /^t\.me\/[a-zA-Z0-9_]{0,}$/,
      "Must start with 't.me/' followed by your username"
    )
    .required("Telegram is required"),
});
