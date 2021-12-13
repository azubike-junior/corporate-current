import React from "react";
import { handleNext, handlePrevious } from "../../services/Mutations/apis";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Introduction() {
  const dispatch = useDispatch();

  return (
    <div className="tab-content p-30" id="myTabContent">
      <div className="tab-pane fade show active nib_cor_instant_tab d-flex justify-content-center">
        <div className="col-lg-8">
          <div className="row">
            {/* <!-- BASIC INFORMATION --> */}
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading text-center bg-gray white-text text-white font-weight-900">
                  BASIC INFORMATION
                </div>
                <div className="panel-body">
                  <div className="user_bvn_data_row1 font-12">
                    <div className="col-lg-12">
                      <div className="row">
                        <p className="font-14">
                          Welcome! Thank you for choosing SunTrust Bank Nigeria.
                          To get started, ensure the underlisted documents are
                          readily available for uploads.
                        </p>
                        <ol className="font-14">
                          <li>Copy of Certificate of Registration</li>
                          <li>Copy of Form 2</li>
                          <li>
                            Recent passport photographs of each signatory to the
                            account
                          </li>
                          <li>
                            Resident Permit or work permit (for Non-Nigerians)
                          </li>
                          <li>Proof of Company Address</li>
                          <li>
                            Proof of Identity of all signatories and
                            Directors/Officers (preferred Identity card are
                            International Passport National Identity Card,
                            National Drivers License and Valid Nigerian INEC
                            Voters Card)
                          </li>
                          <li>
                            Two (2) satisfactorily completed reference forms.
                          </li>
                          <li>Copy of the audited Financial Statements</li>
                        </ol>
                        <p className="font-14" style={{ width: "100%" }}>
                          You are also required to download, fill, and upload
                          the below forms:
                        </p>
                        <ol className="font-14" style={{ width: "100%" }}>
                          <Link to="#">
                            <li>Letter of Indemnity</li>
                          </Link>
                          <Link to="#">
                            <li>Reference Forms</li>
                          </Link>
                          <Link to="#">
                            <li>Signature Card</li>
                          </Link>
                        </ol>

                        <div className="form-group col-lg-8 col-md-12 col-sm-12">
                          <div className="d-flex m-t-20  ">
                            <div
                              onClick={() => dispatch(handleNext())}
                              className="user_acct_details col-lg-6 col-md-4 col-sm-12 m-b-10"
                            >
                              <button className="btn btn-block btn-suntrust font-weight-900">
                                NEXT PAGE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
