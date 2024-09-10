export const formValidation = (data) => {
  let response = [];

  if (!data.region) {
    response["region"] = "Please select region";
  }
  if (!data.business_function) {
    response["business_function"] = "Please select department name";
  }
  if (!data.practice_name) {
    response["practice_name"] = "Please select practice name";
  }
  if (!data.cost_center_owner) {
    response["cost_center_owner"] = "Please enter cost center owner";
  }
  // if (!data.project_name) {
  //   response["project_name"] = "Please enter project name";
  // }

  // if (!data.customer_type) {
  //   response["customer_type"] = "Please select customer type";
  // }
  // if (!data.customer) {
  //   response["customer"] = "Please select customer name";
  // }
  if (!data.currency) {
    response["currency"] = "Please select currency name";
  }

  //   if (
  //     data.projectClientCode?.length < 3 ||
  //     data.projectClientCode?.length > 3
  //   ) {
  //     response["projectClientCode"] =
  //       "Please enter codes with 3 characters only.";
  //   }
  console.log("form validation err", data);
  return response;
};

export const handleFocusFormData = (formErr, formValues) => {
  let errorMsg = { ...formErr };
  if (formValues.region !== "" && formValues.region !== undefined) {
    delete errorMsg.region;
  }
  if (
    formValues.business_function !== "" &&
    formValues.business_function !== undefined
  ) {
    delete errorMsg.business_function;
  }
  if (
    formValues.practice_name !== "" &&
    formValues.practice_name !== undefined
  ) {
    delete errorMsg.practice_name;
  }
  if (
    formValues.cost_center_owner !== "" &&
    formValues.cost_center_owner !== undefined
  ) {
    delete errorMsg.cost_center_owner;
  }
  if (formValues.currency !== "" && formValues.currency !== undefined) {
    delete errorMsg.currency;
  }
  return errorMsg;
};
