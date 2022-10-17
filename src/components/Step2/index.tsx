import React, { SyntheticEvent, useRef, useState } from "react";
import { useStateMachine } from "little-state-machine";
import {
  handleNext,
  handlePrevious,
  useValidateBvnMutation,
  useValidateOtpMutation,
  openShow,
  closeShow,
} from "../../services/Mutations/apis";
import { useDispatch } from "react-redux";
import Button from "./../Button/index";
import Loader from "../Loader";
import {
  useGetLgtQuery,
  useGetStatesQuery,
} from "../../services/Queries/dropDowns";
import {
  validateFileSize,
  FileService,
  validateFileType,
} from "../../utils/validator";
import imageToBase64 from "image-to-base64/browser";
import {
  convertDateToNum,
  getBase64,
  updateName,
} from "./../../utils/utilities";
import Modal from "../Modal";
import { HookInputField } from "./../InputField/index";
import { useForm } from "react-hook-form";
import { UboDetails } from "../../interfaces";

export default function Step2() {
  const dispatch = useDispatch();
  const { state, actions } = useStateMachine({ updateName });
  const [bvnResponse, setBvnResponse] = useState("");
  const { data: states } = useGetStatesQuery("");
  const [bvnError, setBvnError] = useState("");
  const [bvn, setBvn] = useState("");
  const [images, setImages] = useState<any>();
  const [fileType, setFileType] = useState<any>();
  const [fileUrl, setFileUrl] = useState<any>();
  const [doc, setDoc] = useState<any>();
  const [uploadDocError, setUploadDocError] = useState("");
  const [
    validateBvn,
    { data: response, isError, isLoading, isSuccess, error },
  ] = useValidateBvnMutation();
  const { data: localGovts } = useGetLgtQuery("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...state.data,
    },
  });

  //Input refs for emptying the file input after submission
  const idCardRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const signatureRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passportRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const genders = [
    { value: "1", text: "male" },
    { value: "2", text: "female" },
  ];

  //Mapping out keys value for visuals on the interface
  const gender = genders.find(
    (gender) => gender.text === response?.gender.toLowerCase()
  )?.value;
  const lgt = localGovts?.find(
    (lgt: any) => lgt.text === response?.lgaOfOrigin
  )?.value;
  const userState = states?.find(
    (s: any) =>
      s.text.substring(0, 4).toUpperCase() ===
      response?.stateOfOrigin.substring(0, 4).toUpperCase()
  )?.value;

  // Bvn change handler
  const handleBvnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bvn = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12);
    setBvn(bvn);
    setBvnError("");
    if (bvn.length === 11) {
      validateBvn(bvn);
    }
  };

  // File handler
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files;
    const name = e.target.name;

    if (!file) {
      return setUploadDocError("An image is required");
    }
    const validFileSize = await validateFileSize(file[0]?.size);

    const validFileType = await validateFileType(
      FileService.getFileExtension(file[0]?.name)
    );

    if (!validFileSize.isValid) {
      setUploadDocError(validFileSize.errorMessage);
      return;
    }

    if (!validFileType.isValid) {
      setUploadDocError(validFileType.errorMessage);
      return;
    }

    const imageUrl = URL.createObjectURL(file[0]);
    setFileUrl((prev: any) => ({ ...prev, [name]: imageUrl }));
    setFileType((prev: any) => ({ ...prev, [name]: file }));

    getBase64(file).then((response) => {
      setImages((prev: any) => ({ ...prev, [name]: response }));
    });
    setUploadDocError("");
  };

  const addDirectorDetails = () => {
    const details = state.data.directorDetails.map(
      (details) => details.directorBVN
    );

    if (bvn.length !== 11) {
      return setBvnError("Please enter a valid bvn to continue");
    }
    if (!images) {
      return setUploadDocError(
        "You need to upload the following documents to continue"
      );
    }
    if (!images.signature) {
      return setUploadDocError("Signature is required");
    }
    if (!images.passport) {
      return setUploadDocError("Passport is required");
    }
    if (!images.idCard) {
      return setUploadDocError("IdCard is required");
    }
    if (state.data.directorDetails.includes(bvn)) {
    }
    if (details.includes(bvn)) {
      return setBvnError("You can not upload the same bvn twice");
    }
    if (uploadDocError) {
      return;
    }
    if (error) {
      return;
    }

    const newDirector = {
      directorBVN: response?.bvn,
      directorName: `${response?.firstName} ${response?.lastName}`,
      gender,
      religion: "1 Christianity",
      dateofBirth: convertDateToNum(response?.dateOfBirth),
      address: response?.residentialAddress,
      countryofOrigin: response?.nationality,
      stateofOrigin: userState + " " + response?.stateOfOrigin,
      localGovernment: lgt ? lgt + " " + response?.lgaOfOrigin : "2508",
      relationship: response?.relationship,
      signature: images.signature,
      idCard: images.idCard,
      passportPhotoGraph: images.passport,
      passportPhotoGraphExt: fileType?.passport[0].type,
      idCardExt: fileType?.idCard[0].type,
      signatureExt: fileType?.signature[0].type,
    };

    const newDetails = {
      directorName: newDirector.directorName,
      mobileNumber: response?.phoneNumber1,
      emailAddress: response?.email ? response?.email : "No Email from Bvn",
      directorBVN: response?.bvn,
      dateofBirth: response?.dateOfBirth,
      address: response?.residentialAddress,
      countryofOrigin: response?.nationality,
      stateofOrigin: userState,
      gender,
      religion: "1 Christianity",
      signature: fileUrl.signature,
      idCard: fileUrl.idCard,
      passport: fileUrl.passport,
    };

    const directorsArray = state.data.directorDetails;
    const detailsArray = state.data.detailsArray;
    actions.updateName({
      ...state.data,
      directorDetails: [...directorsArray, newDirector],
      detailsArray: [...detailsArray, newDetails],
    });

    setImages("");
    setBvn("");
    setDoc("");

    idCardRef.current.value = "";
    passportRef.current.value = "";
    signatureRef.current.value = "";
  };

  const deleteDetail = (directorBvn: any) => {
    const directorDetail = state.data.directorDetails.filter(
      (item) => item.directorBVN !== directorBvn
    );

    const detailArray = state.data.detailsArray.filter(
      (item) => item.directorBVN !== directorBvn
    );

    actions.updateName({
      ...state.data,
      directorDetails: [...directorDetail],
      detailsArray: [...detailArray],
    });
  };

  const addUboDetails = (data: any) => {
    console.log(">>>>>myData", data);

    const { name, bvn, percentage, place, idType, details } = data;

    const uboData = {
      name,
      bvn,
      percentage,
      place,
      idType,
      details,
    };

    const uboDetails = state.data.uboDetails;
    const uboArray = state.data.uboArray;

    actions.updateName({
      ...state.data,
      uboDetails: [...uboDetails, uboData],
      uboArray: [...uboArray, uboData],
    });

    // console.log(">>>>>uboData", uboData);
    reset();
  };

  const deleteUbo = (uboBvn: any) => {
    const uboDetail = state.data.uboDetails.filter(
      (item) => item.uboBvn !== uboBvn
    );

    const uboArray = state.data.uboArray.filter(
      (item) => item.uboBvn !== uboBvn
    );

    actions.updateName({
      ...state.data,
      uboDetails: [...uboDetail],
      uboArray: [...uboArray],
    });
  };

  const confirmAndContinue = () => {
    if (state.data.directorDetails.length === 0) {
      return setUploadDocError(
        "You need to upload the required documents to continue"
      );
    }
    if (uploadDocError) {
      return;
    }
    dispatch(handleNext());
  };

  return (
    <div className="tab-content" id="myTabContent">
      <div className="tab-pane fade show active nib_cor_instant_tab d-flex justify-content-center">
        <div className="col-lg-8 m-t-20">
          <div className="row">
            {/* <!-- PERSONAL DETAILS --> */}
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading text-center bg-gray white-text text-white font-weight-900">
                  DIRECTORS INFORMATION
                </div>
                <div className="panel-body">
                  <div className="user_bvn_data_row1 font-12 m-b-20">
                    <div className="col-lg-12">
                      <div className="row">
                        <h5
                          style={{
                            textDecoration: "underline",
                            marginBottom: "30px",
                          }}
                        >
                          DIRECTORS DETAILS
                        </h5>
                        <div className="form-group col-lg-12 col-md-6 col-sm-12 font-weight-700 m-b-20">
                          <label>BVN</label>
                          {bvnError && (
                            <span className="pl-2 text-center text-danger">
                              {bvnError}
                            </span>
                          )}
                          <input
                            type="number"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                              (e.target.value = e.target.value.slice(0, 11))
                            }
                            onChange={handleBvnChange}
                            className="form-control col-lg-12 col-md-6 col-sm-12  m-b-10"
                            name="bvn"
                            placeholder="Enter Directors BVN"
                            value={bvn}
                          />
                        </div>

                        <div className="form-group col-lg-12 col-md-6 col-sm-12 font-weight-700 m-b-20 text-center">
                          {isLoading && (
                            <span className="d-flex justify-content-center">
                              <Loader />
                            </span>
                          )}

                          {isSuccess ? (
                            <span
                              style={{ color: "green" }}
                              className="text-center"
                            >
                              Your Bvn is valid, please upload the images to
                              continue
                            </span>
                          ) : (
                            ""
                          )}

                          {error && (
                            <span className="text-center text-danger">
                              Invalid Bvn, Please enter a valid Bvn to continue
                            </span>
                          )}
                        </div>

                        <div className="form-group col-lg-12 col-md-6 col-sm-12 font-weight-700 m-b-20 text-center">
                          {uploadDocError && (
                            <span className="text-danger">
                              {uploadDocError}
                            </span>
                          )}
                        </div>
                        <div className="form-group col-lg-4 col-md-6 col-sm-12 font-weight-700 m-b-20">
                          <label>UPLOAD YOUR SIGNATURE</label>
                          <div className="border py-1 pl-2">
                            <input
                              ref={signatureRef}
                              type="file"
                              onChange={handleFile}
                              name="signature"
                            />
                          </div>
                        </div>

                        <div className="form-group col-lg-4 col-md-6 col-sm-12 font-weight-700 m-b-20">
                          <label>UPLOAD VALID ID CARD</label>
                          <div className="border py-1 pl-2">
                            <input
                              ref={idCardRef}
                              type="file"
                              onChange={handleFile}
                              name="idCard"
                            />
                          </div>
                        </div>

                        <div className="form-group col-lg-4 col-md-6 col-sm-12 font-weight-700 m-b-20">
                          <label>UPLOAD PASSPORT PHOTOGRAPH</label>
                          <div className="border py-1 pl-2">
                            <input
                              ref={passportRef}
                              type="file"
                              onChange={handleFile}
                              name="passport"
                            />
                          </div>
                        </div>

                        <div className="form-group col-lg-12 font-weight-700 m-b-30 d-flex">
                          <Button
                            className="btn btn-suntrust col-5"
                            child="ADD"
                            type="button"
                            onClick={addDirectorDetails}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <div className="header font-weight-700">
                      {/* <h6>DIRECTORS DETAILS</h6> */}
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
                          {state.data.detailsArray.map((detail, index) => {
                            const {
                              directorBVN,
                              emailAddress,
                              directorName,
                              mobileNumber,
                            } = detail;
                            return (
                              <>
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{directorName}</td>
                                  <td>{mobileNumber}</td>
                                  <td>{emailAddress}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-suntrust btn-sm m-b-5 mr-2"
                                      title="view"
                                      onClick={() =>
                                        dispatch(openShow(directorBVN))
                                      }
                                    >
                                      View
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm m-b-5"
                                      title="Delete"
                                      onClick={() => deleteDetail(directorBVN)}
                                    >
                                      Delete
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
                </div>

                <div className="panel-body">
                  <div className="user_bvn_data_row1 font-12 m-b-20">
                    <div className="col-lg-12">
                      <form
                        onSubmit={handleSubmit(addUboDetails)}
                        className="row"
                      >
                        <h5
                          style={{
                            textDecoration: "underline",
                            marginBottom: "30px",
                          }}
                        >
                          DETAILS OF ULTIMATE BENEFICIAL OWNERS (UBOs)
                        </h5>

                        <div className="col-lg-12">
                          {Object.keys(errors).length > 0 && (
                            <span className="text-danger d-flex justify-content-center pb-4">
                              Please fill all required fields.
                            </span>
                          )}
                          <div className="row">
                            <div className="form-group col-lg-4 col-md-12 col-sm-12 font-weight-700">
                              <HookInputField
                                label="COMPANY/INDIVIDUAL"
                                type="text"
                                name="name"
                                // onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                //   (e.target.value = e.target.value.slice(0, 11))
                                // }
                                className="form-control"
                                placeholder="Enter your company Name"
                                register={register}
                                required
                              />
                            </div>
                            <div className="form-group col-lg-4 col-md-12 col-sm-12 font-weight-700">
                              <HookInputField
                                label="BVN/RC NUMBER"
                                type="number"
                                name="bvn"
                                // onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                //   (e.target.value = e.target.value.slice(0, 11))
                                // }
                                className="form-control"
                                placeholder="Enter your bvn"
                                register={register}
                                required
                              />
                            </div>
                            <div className="form-group col-lg-4 col-md-12 col-sm-12 font-weight-700">
                              <HookInputField
                                label="PERCENTAGE OF SHARES"
                                type="text"
                                name="percentage"
                                // onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                //   (e.target.value = e.target.value.slice(0, 11))
                                // }
                                className="form-control"
                                placeholder="Enter your phone number"
                                register={register}
                                required
                              />
                            </div>
                            <div className="form-group col-lg-4 col-md-12 col-sm-12 font-weight-700">
                              <HookInputField
                                label="NATIONALITY/PLACE OF INCORPORATION"
                                type="text"
                                name="place"
                                // onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                //   (e.target.value = e.target.value.slice(0, 11))
                                // }
                                className="form-control"
                                placeholder="Enter your nationality"
                                register={register}
                                required
                              />
                            </div>
                            <div className="form-group col-lg-4 col-md-12 col-sm-12 font-weight-700">
                              <HookInputField
                                label="ID TYPE/NUMBER"
                                type="text"
                                name="idType"
                                // onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                //   (e.target.value = e.target.value.slice(0, 11))
                                // }
                                className="form-control"
                                placeholder="Enter your ID type"
                                register={register}
                                required
                              />
                            </div>
                            <div className="form-group col-lg-4 col-md-12 col-sm-12 font-weight-700">
                              <HookInputField
                                label="DETAILS OF NATURAL PERSONS"
                                type="text"
                                name="details"
                                // onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                //   (e.target.value = e.target.value.slice(0, 11))
                                // }
                                className="form-control"
                                placeholder="Enter details"
                                register={register}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group col-lg-12 col-md-6 col-sm-12 font-weight-700 m-b-20 text-center">
                          {uploadDocError && (
                            <span className="text-danger">
                              {uploadDocError}
                            </span>
                          )}
                        </div>

                        <div className="form-group col-lg-12 font-weight-700 m-b-30 d-flex">
                          <Button
                            className="btn btn-suntrust col-5"
                            child="ADD"
                            type="submit"
                          />
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <div className="header font-weight-700">
                      <h6>Details of Ultimate Beneficial Owners (UBOs):</h6>
                    </div>
                    <div className="table-responsive border font-14">
                      <table className="table table-hover mb-0 c_list">
                        <thead style={{ backgroundColor: "#c4c4c4" }}>
                          <tr>
                            <th>S/N</th>
                            <th>COMPANY</th>
                            <th>BVN/RC NO.</th>
                            <th>MOBILE NO.</th>
                            <th>NATIONALITY</th>
                            <th>ID TYPE/NO.</th>
                            <th>DETAILS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.data.uboArray.map(
                            (detail: UboDetails, index) => {
                              const {
                                serial,
                                name,
                                bvn,
                                percentage,
                                place,
                                idType,
                                details,
                              } = detail;
                              return (
                                <>
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{name}</td>
                                    <td>{bvn}</td>
                                    <td>{percentage}</td>
                                    <td>{place}</td>
                                    <td>{idType}</td>
                                    <td>{details}</td>

                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-sm m-b-5"
                                        title="Delete"
                                        onClick={() => deleteUbo(bvn)}
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                  <Modal />
                                </>
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
          </div>

          <div className="form-group col-lg-12 col-md-12 col-sm-12 m-b-20">
            <div className="d-sm-block d-md-flex m-t-20">
              <Button
                child="PREVIOUS PAGE"
                className="btn btn-block btn-suntrust font-weight-900"
                onClick={() => dispatch(handlePrevious())}
                type="button"
              />

              <Button
                child="NEXT PAGE"
                className="btn btn-block btn-suntrust font-weight-900"
                onClick={confirmAndContinue}
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
