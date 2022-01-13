import React, { useState } from "react";
import {
  handleNext,
  handlePrevious,
  openShow,
  useOpenCorporateAccountMutation,
} from "../../services/Mutations/apis";
import { useDispatch } from "react-redux";
import { useStateMachine } from "little-state-machine";
import { getValues, updateName } from "./../../utils/utilities";
import Modal from "../Modal";
import { useGetBankBranchQuery } from "../../services/Queries/dropDowns";
import AccountOpenSuccessPage from "../../pages/AccountOpenSuccessPage";
import Loader from "../Loader";

export default function Review() {
  const { state: allData, actions } = useStateMachine({ updateName });
  const [openCorporateAccount, { data: responseData, error, isLoading, isError }] =
    useOpenCorporateAccountMutation();
  const { data: branches } = useGetBankBranchQuery("");
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const {
    rcNumber,
    scumlNumber,
    preferedBranch,
    businessName,
    businessAddress,
    emailAddress,
    mobileNumber,
    expectedMonthlyTurnover,
    purposeofAccount,
    dateofRegistration,
    tin,
    detailsArray,
    uploadCorporateDocuments,
    corporateBankingServices,
  } = allData.data;


  console.log(">>>>>>allData", allData);
  

  const branch = branches?.find(
    (branch: any) => branch.value === preferedBranch
  )?.text;

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const submitHandler = () => {
    const { detailsArray, ...rest } = allData.data;
    openCorporateAccount(rest);
  };

  return (
    <>
      {responseData?.responseCode === "00" && (
        <AccountOpenSuccessPage actions={actions} />
      )}
      {isError && (
        <span className="text-danger d-flex justify-content-center">
          sorry, something went wrong
        </span>
      )}
      <div className="tab-content p-30" id="myTabContent">
        {responseData?.responseCode !== "00" ? (
          <div className="tab-pane fade show active nib_cor_instant_tab d-flex justify-content-center">
            <div className="col-lg-8">
              <div className="row">
                {/* <!-- PERSONAL DETAILS --> */}
                <div className=" col-lg-6 col-md-12">
                  <h5>PREVIEW INFORMATION</h5>
                  <div className="card col-lg-12 col-md-12 col-sm-12">
                    <div className="m-t-30 m-b-20">
                      <h6>BASIC INFORMATION</h6>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        RC NUMBER:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {rcNumber}
                      </div>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        BUSINESS NAME:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {businessName}
                      </div>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        PHONE NUMBER:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {mobileNumber}
                      </div>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        EMAIL:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {emailAddress}
                      </div>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        BRANCH:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {branch}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="m-t-20 col-lg-6 col-md-12">
                  <h5>&nbsp;</h5>
                  <div className="card col-lg-12 col-md-12 col-sm-12">
                    <div className="m-t-30 m-b-20">
                      <h6>BUSINESS INFORMATION</h6>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        BUSINESS ADDRESS:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {businessAddress}
                      </div>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        DATE OF REGISTRATION
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {dateofRegistration}
                      </div>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        SCUML NUMBER:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {scumlNumber}
                      </div>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        TAX IDENTIFICATION NUMBER:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {tin}
                      </div>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        EXPECTED MONTHLY INCOME:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {expectedMonthlyTurnover}
                      </div>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        PURPOSE OF ACCOUNT:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {purposeofAccount}
                      </div>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        PREFERRED BANK BRANCH:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {branch}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {/* <!-- ACCOUNT SERVICES REQUIRED --> */}
                <div className="m-t-20 col-lg-12 m-b-50">
                  <div className="card col-lg-12">
                    <div className="m-t-30 m-b-20">
                      <h6>ACCOUNT SERVICES REQUIRED</h6>
                    </div>
                    <div className="d-flex m-b-10 margin_bottom font_size">
                      <label className="col-lg-4 col-md-6 col-sm-12">
                        ELECTRONIC BANKING PREFERENCES:
                      </label>
                      <div className="col-lg-8 col-md-6 col-sm-12 font-weight-700">
                        {corporateBankingServices?.smsAlert && (
                          <span>Sms Alert</span>
                        )}{" "}
                        {corporateBankingServices?.emailAlert && (
                          <span>Email Alert</span>
                        )}{" "}
                        {corporateBankingServices?.token && (
                          <span>Token Alert</span>
                        )}{" "}
                        {corporateBankingServices?.chequeBook && (
                          <span>Cheque Book</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- DIRECTORS INFORMATION --> */}
                <div className="form-group col-lg-12 col-md-12 col-sm-12 m-b-50">
                  <div className="header font-weight-700">
                    <h6>DIRECTOR'S DETAILS</h6>
                  </div>
                  <div className="table-responsive border font-14">
                    <table className="table table-hover mb-0 c_list">
                      <thead style={{ backgroundColor: "#c4c4c4" }}>
                        <tr>
                          <th>S/N</th>
                          <th>DIRECTOR NAME</th>
                          <th>PHONE NUMBER</th>
                          <th>EMAIL</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailsArray.map((detail, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{detail.directorName}</td>
                                <td>{detail.mobileNumber}</td>
                                <td>{detail.emailAddress}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-suntrust btn-sm m-b-5"
                                    title="view"
                                    onClick={() =>
                                      dispatch(openShow(detail.directorBVN))
                                    }
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                              <Modal />
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* // <!-- UPLOADED DOCUMENTS TABLE --> */}
                <div className="form-group col-lg-12 col-md-12 col-sm-12 font-weight-700">
                  <div className="header">
                    <h6>DOCUMENTS UPLOADED</h6>
                  </div>
                  <div className="table-responsive border">
                    <table className="table table-hover mb-0 c_list">
                      <thead style={{ backgroundColor: "#c4c4c4" }}>
                        <tr>
                          <th>S/N</th>
                          <th>TITLE</th>
                          <th>ATTACHMENT</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadCorporateDocuments.map((doc, index) => {
                          return (
                            <tr key={index + 1}>
                              <td>{index + 1}</td>
                              <td>{doc.docTypeName}</td>
                              <td>{doc.imgName}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-suntrust btn-sm m-b-5"
                                  title="view"
                                >
                                  <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    style={{ color: "#fff" }}
                                    className="px-2"
                                  >
                                    View
                                  </a>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* // <!-- AGREEMENTS CHECKBOX --> */}
                <div className="form-group col-lg-12 col-md-12 col-sm-12 font-weight-500 m-t-20">
                  <div className="pl-4 form-check-inline flex justify-center">
                    <input
                      checked={checked}
                      type="checkbox"
                      className="form-check-input mt-1"
                      id="indemnity_terms"
                      onChange={handleChecked}
                      required
                      data-parsley-errors-container="#error-checkbox"
                    />
                    <label className="pt-3">
                      I agree to the{" "}
                      <a
                        href="#"
                        style={{
                          textDecoration: "underline",
                          color: "#005D30",
                        }}
                      >
                        SunTrust Bank Terms and Conditions
                      </a>
                    </label>
                  </div>
                  <p id="error-checkbox"></p>
                </div>

                <div className="form-group col-lg-12 col-md-12 col-sm-12 m-b-20">
                  <div className="d-sm-block d-md-flex m-t-20">
                    <div className="user_acct_details col-lg-6 col-md-6 col-sm-12 m-b-10">
                      <button
                        onClick={() => dispatch(handlePrevious())}
                        className="btn btn-block btn-suntrust font-weight-900"
                      >
                        PREVIOUS PAGE
                      </button>
                    </div>

                    <div className="user_acct_details col-lg-6 col-md-6 col-sm-12 m-b-10">
                      <button
                        disabled={!checked}
                        className="btn btn-block btn-suntrust font-weight-900"
                        onClick={submitHandler}
                      >
                        {isLoading ? <Loader /> : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
