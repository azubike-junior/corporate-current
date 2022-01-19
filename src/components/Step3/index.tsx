import React, { SyntheticEvent, useState, useRef } from "react";
import { handleNext, handlePrevious } from "../../services/Mutations/apis";
import { useDispatch } from "react-redux";
import {
  addOthers,
  getBase64,
  getValues,
  updateName,
} from "./../../utils/utilities";
import { useStateMachine } from "little-state-machine";
import {
  FileService,
  validateFileSize,
  validateFileType,
} from "../../utils/validator";
import imageToBase64 from "image-to-base64/browser";
import { useForm } from "react-hook-form";
import { CsProps } from "../../interfaces";
import {
  useGetBankBranchQuery,
  useGetUploadTypeQuery,
} from "../../services/Queries/dropDowns";
import { uploadTypes } from "../../utils/constant";

export default function Step3() {
  const { state, actions } = useStateMachine({ updateName });
  const [doc, setDoc] = useState<File>();
  const [uploadDocError, setUploadDocError] = useState("");
  const [docTypeError, setDocTypeError] = useState("");
  const [docType, setDocType] = useState("");
  const dispatch = useDispatch();
  const [fileType, setFileType] = useState("");
  const [fileBase64, setFileBase64] = useState<any>();
  const [imgName, setImageName] = useState("");
  const [docTypeName, setDocTypeName] = useState("");
  const { data: uploadType } = useGetUploadTypeQuery("");
  const { data: branch } = useGetBankBranchQuery("");
  const [fileUrl, setFileUrl] = useState("");
  const [branchError, setBranchError] = useState("");
  const [emailAlertChecked, setEmailAlertChecked] = useState<boolean>(false);
  const [smsAlertChecked, setSmsAlertChecked] = useState<boolean>(false);
  const [tokenChecked, setTokenChecked] = useState<boolean>(false);
  const [chequeChecked, setChequeChecked] = useState<boolean>(false);
  const [branchName, setBranchName] = useState("");
  const { data: documentTypes } = useGetUploadTypeQuery("");

  const newValue = { text: "", value: "" };

  const allDocs = getValues(documentTypes, newValue);

  // const uploadTypes = addOthers(allDocs, { id: 3, documentName: "Others" });

  const select = { id: "", documentName: "Select" };
  // const uploadTypes = getValues(uploadType, select);
  const branches = getValues(branch, select);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleEmailAlert = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.updateName({
      ...state.data,
      corporateBankingServices: {
        emailAlert: e.target.checked ? e.target.value : "",
        smsAlert: state.data.corporateBankingServices?.smsAlert,
        token: state.data.corporateBankingServices?.token,
        chequeBook: state.data.corporateBankingServices?.chequeBook,
      },
    });
    setEmailAlertChecked(e.target.checked);
  };
  const handleSmsAlert = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.updateName({
      ...state.data,
      corporateBankingServices: {
        emailAlert: state.data.corporateBankingServices?.emailAlert,
        smsAlert: e.target.checked ? e.target.value : "",
        token: state.data.corporateBankingServices?.token,
        chequeBook: state.data.corporateBankingServices?.chequeBook,
      },
    });
    setSmsAlertChecked(e.target.checked);
  };

  const handleToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.updateName({
      ...state.data,
      corporateBankingServices: {
        emailAlert: state.data.corporateBankingServices?.emailAlert,
        smsAlert: state.data.corporateBankingServices?.smsAlert,
        token: e.target.checked ? e.target.value : "",
        chequeBook: state.data.corporateBankingServices?.chequeBook,
      },
    });
    setTokenChecked(e.target.checked);
  };

  const handleCheque = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.updateName({
      ...state.data,
      corporateBankingServices: {
        emailAlert: state.data.corporateBankingServices?.emailAlert,
        smsAlert: state.data.corporateBankingServices?.smsAlert,
        token: state.data.corporateBankingServices?.token,
        chequeBook: e.target.checked ? e.target.value : "",
      },
    });
    setChequeChecked(e.target.checked);
  };

  const handleFiles = async (e: HTMLInputElement) => {
    const file = e.files;
    if (!file) {
      return setUploadDocError("An image is required");
    }
    const validFileSize = await validateFileSize(file[0]?.size);

    const validFileType = await validateFileType(
      FileService.getFileExtension(file[0]?.name)
    );
    if (!validFileSize.isValid) {
      return setUploadDocError(validFileSize.errorMessage);
    }
    if (!validFileType.isValid) {
      setUploadDocError(validFileType.errorMessage);
      return;
    }
    const imageUrl = URL.createObjectURL(file[0]);

    setFileUrl(imageUrl);
    setDoc(file[0]);
    setFileType(file[0].type);
    setImageName(file[0].name);
    getBase64(file).then((result) => {
      setFileBase64(result);
    });
    setUploadDocError("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CsProps>({
    defaultValues: {
      ...state.data,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const docTypeName = uploadTypes.find(
      (item: any) => item.id === Number(value)
    )?.documentName;

    setDocTypeError("");
    setDocTypeName(docTypeName || "");
    return setDocType(value);
  };

  const handleBranch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    actions.updateName({
      ...state.data,
      preferedBranch: value,
    });
  };

  //submit function
  const addDocuments = () => {
    if (docTypeName === "") {
      return setDocTypeError("You need to choose a document type to continue");
    }
    if (!doc) {
      return setUploadDocError("you need to choose a file ");
    }
    if (fileBase64 === "") {
      return setUploadDocError("You need to choose a file ");
    }
    const docTypes = state.data?.uploadCorporateDocuments?.map(
      (item) => item.docType
    );

    if (docTypes.includes(docType)) {
      return setDocTypeError("You cant upload the same document twice");
    }

    if (uploadDocError) {
      return;
    }

    setDocTypeError("");
    const newData = {
      uploadDoc: fileBase64,
      docType,
      imgName,
      extension: fileType,
      docTypeName,
      doc,
      fileUrl,
    };

    const docArray = state.data.uploadCorporateDocuments;
    actions.updateName({
      ...state.data,
      uploadCorporateDocuments: [...docArray, newData],
    });

    inputRef.current.value = "";
  };

  const confirmAndContinue = () => {
    if (state.data.uploadCorporateDocuments.length === 0) {
      return setDocTypeError(
        "You need to upload required document to continue"
      );
    }
    if (!state.data.preferedBranch) {
      return setBranchError(
        "Please choose bank branch to continue with process"
      );
    }
    actions.updateName({
      ...state.data,
    });

    dispatch(handleNext());
  };

  const deleteDocument = (docType: string) => {
    const newFiles = state.data.uploadCorporateDocuments.filter(
      (item) => item.docType !== docType
    );
    actions.updateName({
      ...state.data,
      uploadCorporateDocuments: [...newFiles],
    });
  };

  return (
    <div className="tab-pane fade show active nib_cor_instant_tab d-flex justify-content-center">
      <div className="col-lg-8">
        <div className="row">
          {/* <!-- UPLOAD DOCUMENTS --> */}
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading text-center bg-gray white-text text-white font-weight-900">
                DOCUMENTS REQUIRED
              </div>

              {docTypeError && (
                <span className="text-danger d-flex justify-content-center pt-3">
                  {docTypeError}
                </span>
              )}

              {uploadDocError && (
                <span className="text-danger d-flex justify-content-center pt-3">
                  {uploadDocError}
                </span>
              )}

              <div className="panel-body">
                <form onSubmit={handleSubmit(addDocuments)}>
                  <div className="user_bvn_data_row1">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="form-group col-lg-12 col-md-12 col-sm-12 font-weight-500 m-b-30">
                          To confirm your identity, please upload copies of your
                          documents. You can attach multiple documents.
                        </div>

                        <div className="form-group col-lg-4 col-md-6 col-sm-12 font-weight-700">
                          <label>SELECT A DOCUMENT TO UPLOAD</label>
                          <select
                            className="form-control"
                            // name="uploadDocuments.docType"
                            value={docType}
                            onChange={(e) => handleChange(e)}
                            // {...register("uploadDocuments.docType")}
                          >
                            {uploadTypes?.map((item: any, index: number) => {
                              return (
                                <option value={item.id}>
                                  {item.documentName}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="form-group col-lg-4 col-md-6 col-sm-12 font-weight-700">
                          <label>
                            UPLOAD A DOCUMENT
                            <span className="text-danger">*</span>
                          </label>

                          <br />
                          <div className="border py-1 pl-2">
                            <input
                              type="file"
                              ref={inputRef}
                              onChange={(e: SyntheticEvent) =>
                                handleFiles(e.currentTarget as HTMLInputElement)
                              }
                              className=""
                            />
                          </div>
                        </div>

                        <div className="form-group col-lg-4 col-md-12 col-sm-12 font-weight-700">
                          <label> &nbsp; </label>
                          <div className="form-group col-lg-12 col-md-12 col-sm-12">
                            <button
                              type="submit"
                              className="btn btn-block btn-suntrust"
                            >
                              ADD DOCUMENT
                            </button>
                          </div>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 col-sm-12 font-weight-700">
                          <div className="header">
                            <h5>Attached Documents</h5>
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
                                {state.data.uploadCorporateDocuments?.map(
                                  (item, index) => {
                                    const {
                                      docType,
                                      imgName,
                                      docTypeName,
                                      uploadDoc,
                                      doc,
                                      fileUrl,
                                    } = item;
                                    return (
                                      <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{docTypeName}</td>
                                        <td>{imgName}</td>
                                        <td>
                                          <button
                                            type="button"
                                            className="btn btn-suntrust btn-sm m-b-5 mr-4"
                                            data-toggle="modal"
                                            data-target="#exampleModal"
                                          >
                                            <a
                                              href={fileUrl}
                                              target="_blank"
                                              style={{ color: "#fff" }}
                                              className="px-2"
                                            >
                                              view
                                            </a>
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-danger btn-sm m-b-5"
                                            title="Delete"
                                            onClick={() =>
                                              deleteDocument(docType)
                                            }
                                          >
                                            Delete
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* //  <!-- ACCOUNT SERVICES REQUIRED --> */}
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-heading text-center bg-gray white-text text-white font-weight-900">
              ADDITIONAL BANKING SERVICE
            </div>
            {branchError && (
              <span className="text-danger d-flex justify-content-center pt-3">
                {branchError}
              </span>
            )}
            <div className="panel-body">
              <div className="user_bvn_data_row1">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="form-group col-lg-12 col-md-6 col-sm-12 font-weight-700">
                      <label>ADDITIONAL BANKING SERVICE</label>
                      <div className="eb_pref font-12 form-group m-t-10 m-b-30">
                        <div className="pl-4 form-check-inline flex justify-center">
                          <input
                            checked={
                              state.data.corporateBankingServices?.smsAlert
                                ? true
                                : false
                            }
                            type="checkbox"
                            className="form-check-input mt-1"
                            required
                            onChange={handleSmsAlert}
                            data-parsley-errors-container="#error-checkbox"
                            name="corporateBankingServices.smsAlert"
                            value="sms"
                          />
                          <label className="pt-3">
                            SMS ALERT (Charges Apply)
                          </label>
                        </div>
                        <div className="pl-4 form-check-inline flex justify-center">
                          <input
                            checked={
                              state.data.corporateBankingServices?.emailAlert
                                ? true
                                : false
                            }
                            type="checkbox"
                            className="form-check-input mt-1"
                            onChange={handleEmailAlert}
                            name="corporateBankingServices.emailAlert"
                            value="email"
                          />
                          <label className="pt-3">EMAIL ALERT</label>
                        </div>
                        <div className="pl-4 form-check-inline flex justify-center">
                          <input
                            checked={
                              state.data.corporateBankingServices?.token
                                ? true
                                : false
                            }
                            type="checkbox"
                            className="form-check-input mt-1"
                            name="corporateBankingServices.token"
                            onChange={handleToken}
                            value="token"
                          />
                          <label className="pt-3">TOKEN (Charges Apply)</label>
                        </div>
                        <div className=" pl-4 form-check-inline flex justify-center">
                          <input
                            checked={
                              state.data.corporateBankingServices?.chequeBook
                                ? true
                                : false
                            }
                            type="checkbox"
                            className="form-check-input mt-1"
                            name="corporateBankingServices.chequeConfirmation"
                            onChange={handleCheque}
                            value="cheque"
                          />
                          <label className="pt-3">
                            CHEQUE BOOK (Charges Apply)
                          </label>
                        </div>
                        <p id="error-checkbox"></p>
                      </div>

                      <div className="form-group font-weight-700 ">
                        <label>PREFERRED BANK BRANCH</label>
                        <select
                          className="form-control"
                          name="preferedBranch"
                          value={state.data.preferedBranch}
                          onChange={handleBranch}
                        >
                          {branches?.map((item: any, index: number) => {
                            return (
                              <option value={item.value}>{item.text}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                onClick={confirmAndContinue}
                className="btn btn-block btn-suntrust font-weight-900"
              >
                NEXT PAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
