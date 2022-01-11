import React, { useEffect } from "react";
import { useStateMachine } from "little-state-machine";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setPage } from "../../services/Mutations/apis";
import { getText, updateName } from "./../../utils/utilities";
import { emptyData } from "./../../utils/constant";

export default function AccountOpenSuccessPage({ actions }: any) {
  const goBack = () => {
    actions.updateName(emptyData);
    setPage();
    window.location.reload();
  };

  return (
    <>
      <div className="col-lg-12 m-b-30">
        <div className="text-center pt-5" style={{}}>
          <h5 className="pb-3" style={{}}>
            The submitted data is being reviewed for approval.
          </h5>
          <h5 className="pb-3">
            Your CORPORATE ACCOUNT number will be sent to your registered email
            and phone number.
          </h5>
          <p className="pb-4">
            For enquiries, please call 09087331440 e-mail
            customershelpdesk@suntrustng.com Thank you for choosing SunTrust
            Bank
          </p>

          <div className="user_acct_details col-lg-2 col-md-6 col-sm-12 mx-auto mt-3 mb-5">
            <button
              type="button"
              onClick={() => goBack()}
              className="btn btn-block btn-suntrust font-weight-900"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
