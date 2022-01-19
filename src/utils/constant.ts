export const employmentStatus = [
  { value: "SELF EMPLOYED", text: "SELF EMPLOYED" },
  { value: "EMPLOYED", text: "EMPLOYED" },
  { value: "RETIRED", text: "RETIRED" },
  { value: "STUDENT", text: "STUDENT" },
  { value: "UNEMPLOYED", text: "UNEMPLOYED" },
  { value: "OTHERS", text: "OTHERS" },
];

export const uploadTypes = [
  { documentName: " ", id: "" },
  { documentName: "Mandate Card", id: 1 },
  { documentName: "Letter of Indemnity ", id: 2 },
  { documentName: "Reference Form", id: 3 },
  { documentName: "RC Certificate ", id: 4 },
  { documentName: "Others", id: 4 },
];

export const annualSalary = [
  { value: "", text: "Select" },
  { value: "50000", text: "50000" },
  { value: "51000-250000", text: "51000-250000" },
  { value: "251000-500000", text: "251000-500000" },
  { value: "501000-LESS THAN 1 MILLION", text: "501000-LESS THAN 1 MILLION" },
  {
    value: "1 MILLION-LESS THAN 5 MILLION",
    text: "1 MILLION-LESS THAN 5 MILLION",
  },
  {
    value: "5 MILLION-LESS THAN 10 MILLION",
    text: "5 MILLION-LESS THAN 10 MILLION",
  },
  {
    value: "10 MILLION-LESS THAN 20 MILLION",
    text: "10 MILLION-LESS THAN 20 MILLION",
  },
  { value: "ABOVE 20 MILLION", text: "ABOVE 20 MILLION" },
];

export const religions = [
  { text: "CHRISTIAN", value: 2 },
  { text: "MUSLIM", value: 1 },
];

export const maritalStatuses = [
  { value: 1, text: "SINGLE" },
  { value: 2, text: "MARRIED" },
  { value: 3, text: "DIVORCED" },
  { value: 4, text: "WIDOWED" },
];

export const titles = [
  { value: 1, text: "MR." },
  { value: 2, text: "MRS." },
  { value: 4, text: "MISS" },
  { value: 5, text: "MS" },
  { value: 6, text: "CHIEF" },
  { value: 9, text: "DR" },
  { value: 11, text: "ENGR" },
  { value: 12, text: "ALHAJI" },
  { value: 13, text: "ALHAJA" },
  { value: 16, text: "PASTOR" },
  { value: 35, text: "HIS MAJESTY" },
  { value: 36, text: "HER MAJESTY" },
];

export const genders = [
  { value: 1, text: "Male" },
  { value: 2, text: "Female" },
];

export const emptyData = {
  rcNumber: "",
  businessName: "",
  mobileNumber: "",
  emailAddress: "",
  dateofRegistration: "",
  scumlNumber: "",
  tin: "",
  expectedMonthlyTurnover: "",
  purposeofAccount: "",
  preferedBranch: "",
  businessAddress: "",
  directorDetails: [],
  uploadCorporateDocuments: [],
  detailsArray: [],
  corporateBankingServices: {
    emailAlert: "",
    smsAlert: "",
    token: "",
    chequeBook: "",
  },
};
