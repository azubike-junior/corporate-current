import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { dataSlice, http } from "../../utils/utilities";
// import Swal from "sweetalert2";
// import toast, { Toaster } from "react-hot-toast";
// import { getTestPayroll } from "./getTempPayroll";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const postUbo = createAsyncThunk("postUbo", async (data: any) => {
  try {
    // console.log(">>>>>>>rest", data);

    const response: any = await http(
      `http://10.11.200.97/UBO/api/Beneficiaries/createBeneficiary`,
      data,
      "POST"
    )

    if (response.statusCode === "96") {
      return response.data;
    }
    if (response.statusCode === "97") {
      return response.data;
    }
    if (response.statusCode === "00") {
      return response.data.data;
    }
  } catch (e: any) {
    console.log("eeeee", e);
    return e.response.data;
  }
});

const addUbo = dataSlice("addUbo", initialState, {}, postUbo);

// export const { useRegisterMutation } = AuthHandler;
export default addUbo.reducer;
