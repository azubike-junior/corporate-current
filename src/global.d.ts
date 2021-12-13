import "little-state-machine";
import {
  AccountSpecifications,
  corporateBankService,
  DetailArray,
  TransactionService,
  UploadDetails,
} from "./interfaces";

declare module "little-state-machine" {
  interface GlobalState {
    data: {
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
      uploadCorporateDocuments: UploadDetails[];
      corporateBankingServices?: corporateBankService;
      detailsArray: DetailArray[];
    };
  }
}
