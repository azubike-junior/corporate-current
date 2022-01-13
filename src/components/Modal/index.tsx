import React from "react";
import { CSSTransition } from "react-transition-group";
import { openShow, closeShow } from "../../services/Mutations/apis";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { useStateMachine } from "little-state-machine";
import { updateName } from "./../../utils/utilities";

export default function Modal() {
  const dispatch = useDispatch();
  const { show, detail: bvn } = useSelector(
    (state: RootState) => state.handler
  );
  const { state, actions } = useStateMachine({ updateName });

  const detail = state.data.detailsArray?.find(
    (detail) => detail.directorBVN === bvn
  );

  return (
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between">
            <h4 className="modal-title">Director's Info</h4>
            <AiOutlineClose
              className=""
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => dispatch(closeShow())}
            />
          </div>
          <div className="modal-body">
            <div className="row d-flex ">
              <div className="col-md-6 col-sm-4">
                <tr>
                  <th>Director details</th>
                </tr>
                <ul className="list-group list-group-flush  d-flex justify-content-center ">
                  <li
                    className="list-group-item pl-3 pb-3 p-0"
                    style={{ border: "none" }}
                  >
                    <strong>Director's Bvn:</strong>{" "}
                    <span>{detail?.directorBVN}</span>
                  </li>
                  <li
                    className="list-group-item pl-3 pb-3 p-0"
                    style={{ border: "none" }}
                  >
                    <strong>Director's Name:</strong>{" "}
                    <span>{detail?.directorName}</span>
                  </li>
                  <li
                    className="list-group-item pl-3 pb-3 p-0"
                    style={{ border: "none" }}
                  >
                    <strong>mobile Number:</strong>{" "}
                    <span>{detail?.mobileNumber}</span>
                  </li>
                  <li
                    className="list-group-item pl-3 pb-3 p-0"
                    style={{ border: "none" }}
                  >
                    <strong>Email Address:</strong>{" "}
                    <span>{detail?.emailAddress}</span>
                  </li>
                  <li
                    className="list-group-item pl-3 pb-3 p-0"
                    style={{ border: "none" }}
                  >
                    <strong>Date Of Birth:</strong>{" "}
                    <span>{detail?.mobileNumber}</span>
                  </li>
                  {/* <li
                    className="list-group-item pl-3 pb-3 p-0"
                    style={{ border: "none" }}
                  >
                    <strong>State Of Origin:</strong>{" "}
                    <span>{detail?.stateofOrigin}</span>
                  </li> */}
                  <li
                    className="list-group-item pl-3 pb-3 p-0"
                    style={{ border: "none" }}
                  >
                    <strong>Date Of Birth:</strong>{" "}
                    <span>{detail?.dateofBirth}</span>
                  </li>
                  {/* <li
                    className="list-group-item pl-3 pb-3 p-0"
                    style={{ border: "none" }}
                  >
                    <strong>Gender:</strong> <span>{detail?.gender}</span>
                  </li> */}
                  <li
                    className="list-group-item pl-3 pb-3 p-0"
                    style={{ border: "none" }}
                  >
                    <strong>Nationality:</strong>{" "}
                    <span>{detail?.countryofOrigin}</span>
                  </li>
                  <li
                    className="list-group-item pl-3 pb-3 p-0"
                    style={{ border: "none" }}
                  >
                    <strong>Address:</strong> <span>{detail?.address}</span>
                  </li>
                </ul>
              </div>

              <div className="col-sm-12 col-md-6">
                <tr>
                  <th>Documents Uploaded</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <td>
                    <strong className="pr-2">Signature</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-suntrust btn-sm m-b-5 mr-2"
                    >
                      <a
                        href={detail?.signature}
                        target="_blank"
                        style={{ color: "#fff" }}
                        className="px-2"
                      >
                        View Signature
                      </a>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong className="pr-2">ID Card</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-suntrust btn-sm m-b-5 mr-2"
                      title="view"
                    >
                      <a
                        href={detail?.idCard}
                        target="_blank"
                        style={{ color: "#fff" }}
                        className="px-2"
                      >
                        View ID
                      </a>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong className="pr-2">Passport: </strong>{" "}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-suntrust btn-sm m-b-5 mr-2"
                      title="view"
                    >
                      <a
                        href={detail?.passport}
                        target="_blank"
                        style={{ color: "#fff" }}
                        className="px-2"
                      >
                        View Passport
                      </a>
                    </button>
                  </td>
                </tr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
