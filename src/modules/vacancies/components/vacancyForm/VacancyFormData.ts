import Check from "@/assets/svgs/Check.svg";

export const dataTags = [
  { id: 1, nameSection: "Project Manager", disabled: false, active: false },
  { id: 2, nameSection: "SEO", disabled: false, active: false },
  { id: 3, nameSection: "Project Manager", disabled: false, active: false },
  { id: 4, nameSection: "Copywriter", disabled: false, active: false },
  { id: 5, nameSection: "Business Analyst", disabled: false, active: false },
  { id: 6, nameSection: "Product Manager", disabled: false, active: false },
];

export const dataTextareas = [
  {
    id: 1,
    title: "Job Description",
    nameFiledForm: "jobDescription",
    placeholder: "Tell us about the job opening",
  },
  {
    id: 2,
    title: "Requirements",
    nameFiledForm: "requirements",
    placeholder: "Describe the requirements for the candidate",
  },
  {
    id: 3,
    title: "Responsibilities",
    nameFiledForm: "responsibilities",
    placeholder: "Specify responsibilities",
  },
  {
    id: 4,
    title: "Terms and conditions",
    nameFiledForm: "terms",
    placeholder: "Describe the working conditions and benefits",
  },
];

export const EmploymentType = [
  { value: "Full time", label: "Full time", icon: Check },
  { value: "Remote", label: "Remote", icon: Check },
  { value: "Any", label: "Any", icon: Check },
];

export const Other = [
  { value: "Other-1", label: "Other-1", icon: Check },
  { value: "Other-2", label: "Other-2", icon: Check },
  { value: "Other-3", label: "Other-3", icon: Check },
];

export const Qualification = [
  { value: "Traine", label: "Traine", icon: Check },
  { value: "Junior", label: "Junior", icon: Check },
  { value: "Middle", label: "Middle", icon: Check },
  { value: "Senior", label: "Senior", icon: Check },
  { value: "Lead", label: "Lead", icon: Check },
];

export const Experience = [
  { value: "No experience", label: "No experience", icon: Check },
  { value: "1 to 3 years", label: "1 to 3 years", icon: Check },
  { value: "3 to 5 years old", label: "3 to 5 years", icon: Check },
  { value: "Over 5 years", label: "Over 5 years", icon: Check },
];

export const Remote = [
  { id: 1, nameSection: "Remote", disabled: false, active: false },
];
