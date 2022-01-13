import React from "react";
import logo from "../../assets/images/new_logo.png";
import StepProgress from "../StepProgress";

export default function CsHeader({ currentStep }: any) {
  return (
    <div>
      <div className="navigation-wrap text-suntrust start-header start-style">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-md navbar-light">
              <a
                className="navbar-brand"
                href="https://suntrustng.com/"
                target="_self"
              >
                <img src={logo} alt="" />
              </a>

              <ul className="navbar-nav ml-auto py-4 py-md-0">
                <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                  <a
                    href="https://suntrustng.com/"
                    className="btn btn-block btn-suntrust font-weight-900"
                  >
                    Home
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="main_content" id="main-content">
        <div className="page">
          <div className="flex-column">
            <div className="card nib_savings">
              <label className="text-center font-weight-700 font-poppins nib">
                OPEN A CORPORATE CURRENT ACCOUNT
              </label>
            </div>

            <div className="col-lg-12 m-b-50 ">
              <ul className="nav nav-pills nav-fill flex-column flex-sm-row font-14 font-weight-900 col-lg-12 pb-10">
                <StepProgress page={currentStep} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
