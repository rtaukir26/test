import axios from "axios";
import { apiEndpoints } from "./apiEndpoints";
import { getUserIdToken } from "./auth";

export const getBudgetList = async () => {
  let token = getUserIdToken();
  return await axios.get(apiEndpoints.viewBudgetData, {
    headers: {
      Authorization: token,
      // Authorization: "Bearer " + token,
    },
  });
};
export const getReportList = async () => {
  let token = getUserIdToken();
  return await axios.get(apiEndpoints.viewBudgetReport, {
    headers: {
      Authorization: token,
      // Authorization: "Bearer " + token,
    },
  });
};
