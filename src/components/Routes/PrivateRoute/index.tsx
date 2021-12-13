import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { BvnValidation } from "../../../utils/constant";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("isSuccess") ? (
          <Component {...props} />
        ) : (
          <Redirect to={""} />
        )
      }
    />
  );
};

export default PrivateRoute;
