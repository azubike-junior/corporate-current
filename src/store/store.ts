import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getDropDownData } from "./../services/Queries/dropDowns";
import { openCorporateAccount, validateBvnAndOtp } from '../services/Mutations/apis';
import NextAndPreviousReducer from "../services/Mutations/apis";

export const store = configureStore({
  reducer: {
    handler: NextAndPreviousReducer,
    [getDropDownData.reducerPath]: getDropDownData.reducer,
    [validateBvnAndOtp.reducerPath]: validateBvnAndOtp.reducer,
    [openCorporateAccount.reducerPath]: openCorporateAccount.reducer
  },
  middleware: (gdm) => gdm().concat(getDropDownData.middleware),
  
  devTools: true,
});

setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;