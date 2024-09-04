import { USER_ID_TOKEN_BUDGET, USER_ID_TOKEN_PMT } from "../constant/auth";
import jwt_decode from "jwt-decode";

export const getUserIdToken = () => {
  return localStorage.getItem(USER_ID_TOKEN_BUDGET)
    ? localStorage.getItem(USER_ID_TOKEN_BUDGET)
    : null;
};

export const deleteUserIdToken = () => {
  localStorage.removeItem(USER_ID_TOKEN_BUDGET);
};




export const decodeUser = () => {
  const userIdToken = localStorage.getItem(USER_ID_TOKEN_BUDGET)
  return userIdToken ? jwt_decode(userIdToken) : {};
};
 