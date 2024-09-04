import { Toast } from "bootstrap";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import deleteIcon from "../../../assets/images/delete.png";
import Modal from "react-modal";
import {
  calculateRowTotal,
  calculateTotals,
  getMonthValue,
  monthMap,
} from "../../../utils/helpers";
import { formValidation } from "../../../utils/validation";
import axios from "axios";
import {
  getCustomerData,
  getDepartmentData,
  getPracticeData,
  saveBudgetData,
} from "../../../services/home.services";
import ConfirmPopup from "../SubmitPopup/SubmitPopup/ConfirmPopup";
import { useNavigate } from "react-router-dom";
import routePath from "../../../routes/routePath";

const BbForm = () => {
  const navigate = useNavigate();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [formErr, setFormErr] = useState([]);
  const [budgetTotal, setBudgetTotal] = useState(0);

  const Region = ["APAC", "EU", "NA", "UK"];
  // const BusinessFunction = [
  //   "Admin & Operations",
  //   "Business Development",
  //   "Delivery Projects",
  //   "Finance & Legal",
  //   "Function Main",
  //   "Function Practice",
  //   "Human Resources",
  //   "IT Systems",
  //   "Marketing & Communications",
  //   "PMO",
  //   "Presales",
  //   "Quality Management",
  // ];
  // const PracticeName = [
  //   "Business Development",
  //   "Delivery",
  //   "Diagnostics Development and EOL Solutions",
  //   "Digital Engineering & Enterprise IT",
  //   "E/E Integration & Vehicle Testing",
  //   "Finance & Legal",
  //   "Functional Safety & Cyber Security",
  //   "Hardware",
  //   "HR Ops",
  //   "Lighting Systems",
  //   "Marketing & Communications",
  //   "	PMO",
  //   "Presales",
  //   "Process & Quality",
  //   "SG&A",
  //   "Software Design & Development",
  //   "Test & Validation Solutions",
  //   "Vehicle Engineering & System Development",
  // ];
  // const Customer = [
  //   "KGM",
  //   "JCB",
  //   "EE Architecture",
  //   "Digitial Mobility",
  //   "Add New +",
  // ];
  // const CustomerType = ["SG&A", "OEM", "Sys Supplier", "Practice", "Others"];

  const CustomerType = [
    { name: "OEM", value: "OEM" },
    { name: "System Supplier", value: "System Supplier" },
    {
      name: "Technology Platform or Solution Providers",
      value: "Technology Platform or Solution Providers",
    },
    { name: "Semiconductor Suppliers", value: "Semiconductor Suppliers" },
  ];
  const [budgetDataApi, setBudgetDataApi] = useState([
    {
      budget_type: "",
      item_description: "",
      cost_center: "",
      currency: "",
      entries: [
        { budgetMonth: "10", year: "24", estimatedBudget: "" },
        { budgetMonth: "11", year: "24", estimatedBudget: "" },
        { budgetMonth: "12", year: "24", estimatedBudget: "" },
      ],
      month_1: "",
      month_2: "",
      month_3: "",
      budget_total: "",
    },
  ]);

  const [formValues, setFormValues] = useState({
    region: "",
    business_function: "",
    cost_center: "",
    project_name: "",
    practice_name: "",
    customer: "",
    customer_type: "",
    financial_year: "2024-2025",
    f_quarter: "3",
  });

  const [BusinessFunction, setBusinessFunction] = useState([]);
  const [practiceNameApi, setPracticeApiData] = useState([]);
  const [customerNameApi, setCustomerApiData] = useState([]);

  const [businessName, setBusinessName] = useState([]);
  // console.log("businessName", businessName);

  //Api Calls
  useEffect(() => {
    getDepartmentData()
      .then((res) => {
        if (res.status === 200 && res.data) {
          setBusinessFunction(res.data.department);
        }
      })
      .catch((err) => err);
    getCustomerData()
      .then((res) => {
        if (res.status === 200 && res.data) {
          setCustomerApiData(res.data.customer);
        }
      })
      .catch((err) => err);
  }, []);

  // filterPractice api data
  useEffect(() => {
    let fdata = BusinessFunction?.filter(
      (item) => item.id === businessName[0]?.id
    );
    getPracticeData(fdata[0]?.id)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setPracticeApiData(res.data.practice);
        }
      })
      .catch((err) => err);
  }, [formValues.business_function]);
  // useEffect(() => {
  //   if (formValues.region) {
  //     delete formErr.region;
  //     setFormErr(formErr);
  //   }
  // }, [formValues, formErr]);
  console.log("formValues", formValues);
  console.log("budgetDataApi", budgetDataApi);
  console.log("BusinessFunction", BusinessFunction);
  console.log("practiceNameApi", practiceNameApi);
  console.log("customerName", customerName);

  // Handler for select box changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "business_function") {
      let d = BusinessFunction.filter((item) => item.unitname === value);
      setBusinessName(d);
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const months = ["Oct-24", "Nov-24", "Dec-24"];
  // const [nextId, setNextId] = useState(1);

  //Add more rows
  const handleAddMore = () => {
    let template = {
      budget_type: "",
      item_description: "",
      cost_center: "",
      currency: "",
      entries: [
        { budgetMonth: "10", year: "24", estimatedBudget: "" },
        { budgetMonth: "11", year: "24", estimatedBudget: "" },
        { budgetMonth: "12", year: "24", estimatedBudget: "" },
      ],
    };
    setBudgetDataApi([...budgetDataApi, template]);
  };

  // Form submit handler - popup
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmit(true);
    console.log("Form Values:", formValues);
    // const validated = formValidation(formValues);
    // if (Object.keys(validated)?.length > 0) {
    //   setFormErr(validated);
    //   // toast.dismiss();
    //   // let msg = "Please fill all the mandatory fields.";
    //   // if (Object.keys(validated)?.length < 2) {
    //   //   let fieldMsg = Object?.values(validated)
    //   //     .map((item) => item)
    //   //     .toString();
    //   //   msg = fieldMsg;
    //   // }
    //   // toast.error(msg);
    // } else {
    // }
    // toast.success("Form has been submitted successfully");
    // console.log("validated", validated);

    // You can add logic to handle form submission here
  };
  //popup OK button
  const handleConfirmSubmit = () => {
    let updateTotal=budgetDataApi.map((item) => {
      return { ...item, budget_total: parseFloat(budgetTotal) };
    });
    setBudgetDataApi(updateTotal);
    let postData = { ...formValues, child: updateTotal };
    // navigate(routePath.budgetView);

    saveBudgetData(postData)
      .then((res) => {
        if (res.status === 200) {
          console.log("res", res);
          toast.success("Form has been submitted successfully");
          navigate(routePath.budgetView);
        } else {
          toast.error("something went wrong");
        }
        console.log("res", res);
      })
      .catch((err) => err);
    console.log("postData", postData);
    setIsSubmit(false);
  };

  const handleDeleteRow = (idx) => {
    let filteredData = budgetDataApi.filter((item, i) => i !== idx);
    setBudgetDataApi(filteredData);
  };

  //hanlde month change
  const handleMonthChange = (e, monthValue, rowIndex, idx, isActual) => {
    const newArray = [...budgetDataApi];
    if (!newArray[rowIndex]) {
      console.error(`Row index ${rowIndex} is out of bounds in newArray.`);
      return;
    }
    // Convert the input value to a number
    const newValue = parseFloat(e.target.value) || 0;

    // -----------------
    if (idx === 0) {
      newArray[rowIndex].month_1 = newValue;
    }
    if (idx === 1) {
      newArray[rowIndex].month_2 = newValue;
    }
    if (idx === 2) {
      newArray[rowIndex].month_3 = newValue;
    }

    // -----------------

    let monthName = monthValue?.split("-")[0]; //"Jan,Feb",..
    const monthNumber = monthMap[monthName]; //"04","05",..

    const month = monthNumber.toString();
    const yearShort = monthValue?.split("-")[1]; // "2024"

    // Find the index of the entry to update or remove
    const entryIndex = newArray[rowIndex]?.entries?.findIndex(
      // (entry) => entry.budgetMonth === month && entry.budgetYear === yearShort
      (entry) => entry.budgetMonth === month
    );
    if (newValue > 0) {
      if (entryIndex !== -1) {
        // If the entry exists, update the estimatedBudget
        newArray[rowIndex].entries[entryIndex] = {
          ...newArray[rowIndex].entries[entryIndex],
          estimatedBudget: newValue,
        };
      } else {
        // If the entry does not exist, create a new one
        const newEntry = {
          budgetMonth: month,
          budgetYear: yearShort,
          componentId: newArray[rowIndex].UUID, // Component ID from the row
          budgetId: null,
          estimatedBudget: newValue,
        };
        newArray[rowIndex].entries.push(newEntry);
      }
    } else {
      if (entryIndex !== -1) {
        newArray[rowIndex].entries.splice(entryIndex, 1);
      }
    }
    setBudgetDataApi(newArray);
  };

  let totals = calculateTotals(budgetDataApi, months, monthMap, "R");
  useEffect(() => {
    let bdgtTotal = totals
      .reduce((acc, curr) => acc + curr.value, 0)
      .toFixed(2);
    setBudgetTotal(bdgtTotal);
    // const updateTotal = budgetDataApi.map((item) => {
    //   return { ...item, budget_total: parseFloat(budgetTotal) };
    // });
    // setBudgetDataApi(updateTotal);
  }, [totals]);
  return (
    <div className="bb-main-con">
      <div className="bb-main-body">
        <ConfirmPopup
          headerTitle="Budget planner"
          title="Are your sure, want to submit ?"
          isModalOpen={isSubmit}
          handleCancel={setIsSubmit}
          handleSubmitConfirm={handleConfirmSubmit}
        />
        <form onSubmit={handleSubmit}>
          <div className="form-div">
            {/* Region --1 */}
            <div className="field-con">
              <label htmlFor="region">Region</label>
              <select
                name="region"
                value={formValues.region}
                onChange={handleChange}
                // className={formErr.region ? "field-error" : ""}
              >
                <option value="">Select Region</option>
                {Region.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* BusinessFunction --2 */}
            <div className="field-con">
              <label htmlFor="business_function">Department</label>
              <select
                name="business_function"
                value={formValues.business_function}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {BusinessFunction?.map((option) => (
                  <option key={option.unitname} value={option.unitname}>
                    {option.unitname}
                  </option>
                ))}
              </select>
            </div>

            {/* Practice Name  --3 */}
            <div className="field-con">
              <label htmlFor="practice_name">Practice Name</label>
              <select
                name="practice_name"
                value={formValues.practice_name}
                onChange={handleChange}
              >
                <option value="">Select Practice Name</option>
                {practiceNameApi?.map((option) => (
                  <option key={option.deptname} value={option.deptname}>
                    {option.deptname}
                  </option>
                ))}
              </select>
            </div>
            {/* Cost Center Owner  --4 */}
            <div className="field-con">
              <label htmlFor="cost_center">Cost Center Owner</label>
              <input
                type="text"
                name="cost_center"
                value={formValues.cost_center}
                onChange={handleChange}
              />
            </div>

            {/* Project Name  --5 */}
            <div className="field-con">
              <label htmlFor="project_name">Project Name</label>
              <input
                type="text"
                name="project_name"
                placeholder="Enter Project Name"
                value={formValues.project_name}
                onChange={handleChange}
              />
            </div>

            {/* Customer Type --6 */}
            <div className="field-con">
              <label htmlFor="customer_type">Customer Type</label>
              <select
                name="customer_type"
                value={formValues.customer_type}
                onChange={handleChange}
              >
                <option value="">Select Customer Type</option>
                {CustomerType.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Customer --7 */}
            <div className="field-con">
              <label htmlFor="customer">Customer</label>
              {isAddingNew ? (
                <input
                  type="text"
                  name="customer"
                  placeholder="Enter Customer Name"
                  value={customerName}
                  autoFocus
                  // onChange={handleChange}
                  onChange={(e) => {
                    let { name, value } = e.target;
                    setCustomerName(value);
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      [name]: value,
                    }));
                  }}
                />
              ) : (
                <select
                  name="customer"
                  // value={formValues.Customer}
                  value={customerName}
                  onChange={(e) => {
                    let { name, value } = e.target;
                    console.log("value", value);
                    if (value === "Add New +") {
                      setIsAddingNew(true);
                      setCustomerName("");
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        [name]: value,
                      }));
                    } else {
                      setCustomerName(value);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        [name]: value,
                      }));
                    }
                  }}
                >
                  <option value="">Select Customer</option>
                  {customerNameApi?.map((option) => (
                    <option key={option.client_name} value={option.client_name}>
                      {option.client_name}
                    </option>
                  ))}
                  <option value="Add New +">Add New +</option>
                </select>
              )}
            </div>

            {/* child component */}
            <div className="child-con">
              <div className="child-body">
                <>
                  <div className="custom-table-con">
                    <table className="custom-table">
                      <thead>
                        <tr className="">
                          <th className="header-th" colSpan="12">
                            <div>
                              TOTAL Q3 BUDGET:
                              <span>
                                {totals
                                  .reduce((acc, curr) => acc + curr.value, 0)
                                  .toFixed(2)}
                              </span>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th>Budget Type</th>
                          <th>Item Description</th>
                          <th>Cost Center</th>
                          <th>Currency</th>
                          {/* Months - header th */}
                          {months.map((month) => (
                            <th>{month}</th>
                          ))}
                          {/* <th>Oct-24</th>
                          <th>Nov-24</th>
                          <th>Dec-24</th> */}
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {budgetDataApi.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {/* Budget Type */}
                            <td>
                              <div>
                                <select
                                  value={row.budget_type}
                                  onChange={(e) => {
                                    const newRows = [...budgetDataApi];
                                    newRows[rowIndex].budget_type =
                                      e.target.value;

                                    setBudgetDataApi(newRows);
                                  }}
                                >
                                  <option value="Resources">Resources</option>
                                  <option value="Capex">Capex</option>
                                  <option value="Opex">Opex</option>
                                  <option value="Pass Through">
                                    Pass Through
                                  </option>
                                  <option value="others">Others</option>
                                </select>
                              </div>
                            </td>
                            {/* Item Description */}
                            <td>
                              <div>
                                <input
                                  type="text"
                                  name="item_description"
                                  value={row.item_description}
                                  onChange={(e) => {
                                    const newRows = [...budgetDataApi];
                                    newRows[rowIndex].item_description =
                                      e.target.value;

                                    setBudgetDataApi(newRows);
                                  }}
                                />
                              </div>
                            </td>
                            {/* Cost Center Owner */}
                            <td>
                              <div>
                                <input
                                  type="text"
                                  name="cost_center"
                                  value={row.cost_center}
                                  onChange={(e) => {
                                    const newRows = [...budgetDataApi];
                                    newRows[rowIndex].cost_center =
                                      e.target.value;

                                    setBudgetDataApi(newRows);
                                  }}
                                />
                              </div>
                            </td>
                            {/* Currency */}
                            <td>
                              <div>
                                <select
                                  name="currency"
                                  value={row.currency}
                                  onChange={(e) => {
                                    const newRows = [...budgetDataApi];
                                    newRows[rowIndex].currency = e.target.value;

                                    setBudgetDataApi(newRows);
                                  }}
                                >
                                  <option value="INR">INR</option>
                                  <option value="USD">USD</option>
                                  <option value="EUR">EUR</option>
                                  <option value="EUR">GBP</option>
                                </select>
                              </div>
                            </td>

                            {/* Months */}
                            {months.map((monthValue, idx) => (
                              <td key={idx}>
                                <div>
                                  <input
                                    type="text"
                                    value={getMonthValue(row, monthValue, idx)}
                                    onChange={(e) =>
                                      handleMonthChange(
                                        e,
                                        monthValue,
                                        rowIndex,
                                        idx,
                                        "estimateBudget"
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            ))}
                            {/* Total Row values */}
                            <td>
                              <div className="total-row-cal">
                                <input
                                  type="text"
                                  value={calculateRowTotal(
                                    row,
                                    "estimateBudget"
                                  )}
                                  readOnly
                                />
                              </div>
                            </td>
                            {/* Delete Icon */}
                            <td className="delete-row">
                              <img
                                className={
                                  budgetDataApi.length < 2 &&
                                  "delete-icon-disable"
                                }
                                onClick={() =>
                                  budgetDataApi.length > 1
                                    ? handleDeleteRow(rowIndex)
                                    : null
                                }
                                src={deleteIcon}
                                alt="delete"
                              />
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan="12">
                            <div className="btn-grp">
                              <button type="button" onClick={handleAddMore}>
                                Add More
                              </button>
                            </div>
                          </td>
                        </tr>
                        {/* Planned Total */}
                        <tr className="total-month-tr">
                          <td colSpan="4">
                            <div className="total-month-div">
                              Total per month
                            </div>
                          </td>
                          {totals.map((total, index) => (
                            <td key={index}>{total.value}</td> // Format to two decimal places
                          ))}
                          <td>
                            {totals
                              .reduce((acc, curr) => acc + curr.value, 0)
                              .toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <div className="total-budget">
                    <span>TOTAL Q3 BUDGET:</span>
                    <span>&#8377;&nbsp;10</span>
                    <span>----</span>
                  </div>
                  {budgetData?.map((row, i) => (
                    <div className="row-data" key={i}>
                      {row.rowData.map((item, idx) => (
                        <>
                          <div className="select-filed" title={item.label}>
                            <label htmlFor="">{item.label}</label>
                            <input
                              type="text"
                              name={`val${idx}`}
                              value={budgetData.value}
                              placeholder="write.."
                              onChange={handleChangeInput}
                            />
                          </div>
                        </>
                      ))}
                      {budgetData.length > 1 && (
                        <div className="btn-delete">
                          <img
                            onClick={() => handleDeleteRow(row.id)}
                            src={deleteIcon}
                            alt="delete"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="total-row-calc">
                    <span>Total</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                  </div> */}
                </>
              </div>
              {/* <div className="btn-grp">
                <button type="button" onClick={handleAddMore}>
                  Add More
                </button>
              </div> */}
            </div>
          </div>
          <div className="btn-submit-con">
            <button className="btn-submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BbForm;
