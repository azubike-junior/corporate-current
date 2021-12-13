import React, { useState } from "react";
// import { createStore, StateMachineProvider } from "little-state-machine";
import {
  createStore,
  useStateMachine,
  StateMachineProvider,
  GlobalState,
} from "little-state-machine";
import { useForm } from "react-hook-form";
import CsHeader from "../../components/CcHeader";
import ReviewInfo from "../../components/ReviewInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Introduction from "../../components/Introduction/index";
import Step1 from "../../components/Step1/index";
import Step3 from "../../components/Step3/index";
import Step2 from "../../components/Step2/index";

createStore(
  {
    data: {
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
    },
  },
  {}
);

export default function CompleteSavingsAccount() {
  const [csState, setCsState] = useState({});
  const page = useSelector((state: RootState) => state.handler.page);

  const {
    formState: { errors },
  } = useForm({ defaultValues: csState });

  const displaySteps = (step: number) => {
    if (step === 1) {
      return <Introduction />;
    } else if (step === 2) {
      return <Step1 />;
    } else if (step === 3) {
      return <Step2 />;
    } else if (step === 4) {
      return <Step3 />;
    } else if (step === 5) {
      return <ReviewInfo />;
    }
  };

  return (
    <StateMachineProvider>
      <div className="pb-5 overflowhidden">
        <CsHeader currentStep={page} />
        {displaySteps(page)}
      </div>
    </StateMachineProvider>
  );
}
