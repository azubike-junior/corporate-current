import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { dataSlice, http } from "../../utils/utilities";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

const baseUrl = "";

export const getUbo = createAsyncThunk(
  "getUbo",
  async () => {
    try {

      const response: any = await http(
        `${baseUrl}/payroll/approveTestRun`,
        "",
        "GET"
      );

      console.log(">>>>response", response);

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
      return e.response.data;
    }
  }
);

const getAllUbos = dataSlice(
  "approveTestRun",
  initialState,
  {},
  getUbo
);

// export const { useRegisterMutation } = AuthHandler;
export default getAllUbos.reducer;
