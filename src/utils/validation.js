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
  if (!data.cost_center) {
    response["cost_center"] = "Please enter const center owner";
  }
  if (!data.project_name) {
    response["project_name"] = "Please enter project name";
  }

  if (!data.customer_type) {
    response["customer_type"] = "Please select customer type";
  }
  if (!data.customer) {
    response["customer"] = "Please select customer name";
  }
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
