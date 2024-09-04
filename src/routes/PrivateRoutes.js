import React, { useEffect } from "react";
import routePath from "./routePath";
import { useNavigate } from "react-router-dom";
import { getUserIdToken } from "../services/auth";

const PrivateRoutes = ({ children }) => {
  const Navigate = useNavigate();
  // const userToken = getUserIdToken();
  // console.log("userToken", userToken);
  // if (userToken === null) {
  //   <Navigate to={routePath.unAuthorized} />;
  // }
  let userToken = true;
  useEffect(() => {
    if (userToken === null) {
      return Navigate("/unauthorized");
    }
  }, []);
  return children;
};

export default PrivateRoutes;
