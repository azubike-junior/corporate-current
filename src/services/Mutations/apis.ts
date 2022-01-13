import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const initialState = {
  page: 1,
  show: false,
  detail: "",
};

export const validateBvnAndOtp = createApi({
  reducerPath: "validateBvnAndOtp",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.11.200.97/BvnValidationsApi/Validations`,
  }),

  endpoints: (builder) => ({
    validateBvn: builder.mutation({
      query: (bvn: string) => ({
        url: "ValidateBvn",
        method: "POST",
        body: { bvn },
      }),
    }),

    validateOtp: builder.mutation({
      query: (data: any) => ({
        url: "SendSms",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const openCorporateAccount = createApi({
  reducerPath: "",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.11.200.97/accountopening/api/v1/AccountOpening/`,
    prepareHeaders: (headers) => {
      const token =
        "4I[PdB7l&/omZT[o.wG^v!<Nni%ANMkSW'+U^5>HepGZ9Nm1xox}#%<?Zx3/7O]";
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    openCorporateAccount: builder.mutation({
      query: (data: any) => ({
        url: "corporateAcount",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const NextAndPreviousHandler = createSlice({
  name: "NextAndPrevious",
  initialState,
  reducers: {
    handleNext(state) {
      state.page++;
    },
    handlePrevious(state) {
      state.page--;
    },
    setPage(state) {
      state.page = 1;
    },
    openShow(state, action) {
      state.detail = action.payload;
      state.show = true;
    },
    closeShow(state) {
      state.show = false;
    },
  },
});

export const { handleNext, handlePrevious, setPage, openShow, closeShow } =
  NextAndPreviousHandler.actions;
export default NextAndPreviousHandler.reducer;
export const { useOpenCorporateAccountMutation } = openCorporateAccount;
export const { useValidateBvnMutation, useValidateOtpMutation } =
  validateBvnAndOtp;

//22277557146
