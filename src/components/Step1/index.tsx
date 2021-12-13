import React, { useState } from "react";
import { handleNext, handlePrevious } from "../../services/Mutations/apis";
import { useDispatch } from "react-redux";
import { HookInputField, SelectInput } from "../InputField";
import { useForm } from "react-hook-form";
import Button from "./../Button/index";
import { useStateMachine } from "little-state-machine";
import { updateName } from "./../../utils/utilities";
import { annualSalary } from "../../utils/constant";

export default function Step1() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { actions, state } = useStateMachine({ updateName });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...state.data,
    },
  });

  const submitHandler = (data: any) => {
    state.data = {
      ...data,
    };
    actions.updateName(state.data);
    // console.log(">>>>>state", state);
    dispatch(handleNext());
  };

  const pattern2 = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "invalid email address",
  };

  console.log(">>>>stateAfter", state, errors);

  return (
    <div className="tab-pane fade show active nib_cor_instant_tab d-flex justify-content-center">
      <form className="col-lg-8 m-t-10" onSubmit={handleSubmit(submitHandler)}>
        {Object.keys(errors).length > 0 && (
          <span className="text-danger d-flex justify-content-center pb-2">
            All fields with Asteric are required
          </span>
        )}
        <div className="row">
          {/* <!-- PERSONAL DETAILS --> */}

          <div className="col-lg-12 ">
            <div className="panel panel-default">
              <div className="panel-heading text-center bg-gray white-text text-white font-weight-900">
                BUSINESS INFORMATION
              </div>
              <div className="panel-body">
                <div className="user_bvn_data_row1 font-12">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="form-group col-lg-6 col-md-12 col-sm-12 font-weight-700">
                        <HookInputField
                          label="RC NUMBER"
                          type="number"
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            (e.target.value = e.target.value.slice(0, 11))
                          }
                          name="rcNumber"
                          className="form-control"
                          placeholder="Enter your Company's RC Number"
                          register={register}
                          errors={errors.rcNumber}
                          required
                        />
                      </div>

                      <div className="form-group col-lg-6 col-md-12 col-sm-12 font-weight-700">
                        <HookInputField
                          label="BUSINESS NAME"
                          type="text"
                          name="businessName"
                          className="form-control"
                          placeholder="Enter your Business Name"
                          register={register}
                          errors={errors.businessName}
                          required
                        />
                      </div>

                      <div className="form-group col-lg-6 col-md-12 col-sm-12 font-weight-700">
                        <HookInputField
                          label="MOBILE NUMBER"
                          type="number"
                          name="mobileNumber"
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            (e.target.value = e.target.value.slice(0, 11))
                          }
                          className="form-control"
                          placeholder="Enter your phone number"
                          register={register}
                          errors={errors.mobileNumber}
                          required
                        />
                      </div>

                      <div className="form-group col-lg-6 col-md-12 col-sm-12 font-weight-700">
                        <HookInputField
                          label="EMAIL"
                          type="text"
                          name="emailAddress"
                          pattern={pattern2}
                          className="form-control"
                          placeholder="Enter Email Address"
                          errors={errors.emailAddress}
                          register={register}
                          required
                          message="please make sure you enter a valid email"
                        />
                      </div>

                      <div className="form-group col-lg-6 col-md-6 col-sm-12 font-weight-700">
                        <HookInputField
                          label="BUSINESS ADDRESS"
                          type="text"
                          name="businessAddress"
                          className="form-control"
                          placeholder="Enter your business address"
                          register={register}
                          errors={errors.businessAddress}
                          required
                        />
                      </div>

                      <div className="form-group col-lg-6 col-md-6 col-sm-12 font-weight-700">
                        <HookInputField
                          label="DATE OF REGISTRATION"
                          type="date"
                          name="dateofRegistration"
                          className="form-control"
                          placeholder=""
                          register={register}
                          errors={errors.dateofRegistration}
                          required
                        />
                      </div>

                      <div className="form-group col-lg-6 col-md-6 col-sm-12 font-weight-700">
                        <HookInputField
                          label="SCUML NUMBER (where applicable)"
                          type="number"
                          name="scumlNumber"
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            (e.target.value = e.target.value.slice(0, 11))
                          }
                          className="form-control"
                          placeholder="Enter your scuml number"
                          register={register}
                          required
                          errors={errors.scumlNumber}
                        />
                      </div>

                      <div className="form-group col-lg-6 col-md-6 col-sm-12 font-weight-700">
                        <HookInputField
                          label="TAX IDENTIFICATION NUMBER (TIN)"
                          type="number"
                          name="tin"
                          className="form-control"
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            (e.target.value = e.target.value.slice(0, 11))
                          }
                          placeholder="Enter your tax identification number"
                          register={register}
                          required
                          errors={errors.tin}
                        />
                      </div>

                      <SelectInput
                        label="EXPECTED MONTHLY INCOME"
                        type="text"
                        name="expectedMonthlyTurnover"
                        className="form-group col-lg-6 col-md-6 col-sm-12 font-weight-700"
                        selectArray={annualSalary}
                        register={register}
                        required
                        errors={errors.expectedMonthlyTurnover}
                      />

                      <div className="form-group col-lg-6 col-md-6 col-sm-12 font-weight-700">
                        <HookInputField
                          label="PURPOSE OF ACCOUNT"
                          type="text"
                          name="purposeofAccount"
                          className="form-control"
                          placeholder="Enter your purpose of account"
                          register={register}
                          required
                          errors={errors.purposeofAccount}
                          message="purpose of Account is required"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group col-lg-12 col-md-12 col-sm-12 m-b-20">
          <div className="d-flex m-t-20">
            <Button
              child="PREVIOUS PAGE"
              className="btn btn-block btn-suntrust font-weight-900"
              onClick={() => dispatch(handlePrevious())}
              type="button"
            />

            <Button
              child="NEXT PAGE"
              className="btn btn-block btn-suntrust font-weight-900"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
