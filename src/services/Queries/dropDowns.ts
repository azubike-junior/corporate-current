import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getDropDownData = createApi({
  reducerPath: "getDropDown",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.11.200.97/accountopening/api/v1/`,
  }),
  endpoints: (build) => ({
    getStates: build.query({
      query: () => `AccountOpening/GetState`,
    }),
    getCity: build.query({
      query: () => `AccountOpening/GetCity`,
    }),
    getLgt: build.query({
      query: () => `AccountOpening/GetLocalGovt`,
    }),
    getUploadType: build.query({
      query: () => `AccountOpening/GetCorporateDocumentType`,
    }),
    getBankBranch: build.query({
      query: () => `AccountOpening/GetBranch`,
    }),
  }),
});

export const {
  useGetStatesQuery,
  useGetCityQuery,
  useGetUploadTypeQuery,
  useGetLgtQuery,
  useGetBankBranchQuery
} = getDropDownData;
