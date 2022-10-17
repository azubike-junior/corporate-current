export interface CsProps {
  rcNumber?: string;
  businessName?: string;
  mobileNumber?: string;
  emailAddress?: string;
  dateofRegistration?: string;
  scumlNumber?: string;
  tin?: string;
  expectedMonthlyTurnover?: string;
  purposeofAccount?: string;
  preferedBranch?: string;
  businessAddress?: string;
  directorDetails: DirectorDetails[];
  uploadCorporateDocuments?: UploadDetails[];
  corporateBankingServices?: corporateBankService;
  detailsArray: DetailArray[];
  uboDetails?: UboDetails[];
  uboArray?: UboDetails[];
}
export interface corporateBankService {
  emailAlert?: string;
  smsAlert?: string;
  token?: string;
  chequeBook?: string;
}

export interface UploadDetails {
  uploadDoc: any;
  docType: string;
  imgName?: string;
  extension: string;
  docTypeName?: string;
  doc?: any;
  fileUrl?: string;
}

export interface DirectorDetails {
  directorBVN?: string;
  directorName?: string;
  gender?: string;
  dateofBirth?: string;
  address?: string;
  countryofOrigin: string;
  stateofOrigin?: string;
  localGovernment?: string;
  nextofKinName?: string;
  nextofKinPhoneNumber?: string;
  relationship?: string;
  signature?: string;
  idCard?: string;
  passportPhotoGraph?: string;
  passportPhotoGraphExt?: string;
  idCardExt?: string;
  signatureExt?: string;
  religion?: string;
}

export interface DetailArray {
  directorName?: string;
  directorBVN?: string;
  mobileNumber?: string;
  emailAddress?: string;
  dateofBirth?: string;
  gender?: string;
  stateofOrigin?: string;
  countryofOrigin: string;
  signature?: string;
  idCard?: string;
  passport?: string;
  address?: string;
  religion?: string;
}

export interface UboDetails {
  name?: string;
  bvn?: string;
  percentage?: string;
  place?: string;
  idType?: string;
  details?: string;
  serial?: string
}
