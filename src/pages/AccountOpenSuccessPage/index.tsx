import React, { useEffect } from "react";
import { useStateMachine } from "little-state-machine";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setPage } from "../../services/Mutations/apis";
import { getText, updateName } from "./../../utils/utilities";
import { emptyData } from "./../../utils/constant";

export default function AccountOpenSuccessPage({ actions }: any) {
  // const { state: allData, actions } = useStateMachine({ updateName });
  const goBack = () => {
    actions.updateName(emptyData);
    setPage();
    window.location.reload();
  };

  return (
    <>
      <div className="col-lg-12 m-b-30">
        <div className="text-center pt-5" style={{}}>
          <p style={{ paddingBottom: "" }}>
            Congratulations! Your submitted data and documents are being
            reviewed for validation
          </p>
          <p>
            An email will be sent to your registered email for continuation of
            the started process.
          </p>
          <h6>Thank you for taking this journey with us.</h6>

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
