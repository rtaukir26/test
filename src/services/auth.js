import { USER_ID_TOKEN_BUDGET, USER_ID_TOKEN_PMT } from "../constant/auth";

export const getUserIdToken = () => {
  return localStorage.getItem(USER_ID_TOKEN_BUDGET)
    ? localStorage.getItem(USER_ID_TOKEN_BUDGET)
    : null;
};

export const deleteUserIdToken = () => {
  localStorage.removeItem(USER_ID_TOKEN_BUDGET);
};
