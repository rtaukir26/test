import axios from "axios";
import { apiEndpoints } from "./apiEndpoints";
import { getUserIdToken } from "./auth";

export const getDepartmentData = async () => {
  return await axios.get(apiEndpoints.departmentFilter);
};
export const getPracticeData = async (id) => {
  //   return await axios.get(
  //     `http://localhost:3000/budget-app/practice-filter?id=${id}`
  //   );
  // return await axios.get(`${apiEndpoints.practiceFilter}?id=${id}`);

  let token = getUserIdToken();
  return await axios.get(`${apiEndpoints.practiceFilter}?id=${id}`, {
    headers: {
      Authorization: token,
      // Authorization: "Bearer " + token,
    },
  });
};
export const getCustomerData = async () => {
  return await axios.get(apiEndpoints.customerFilter);
};
export const saveBudgetData = async (data) => {
  return await axios.post(apiEndpoints.saveFilter, data);
};
