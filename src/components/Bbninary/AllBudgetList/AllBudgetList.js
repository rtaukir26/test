import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routePath from "../../../routes/routePath";
import {
  getBudgetList,
  getReportList,
  getReportListExport,
} from "../../../services/budgetViewServices";
import downloadIcon from "../../../assets/images/file.png";
import noDataFoundIcon from "../../../assets/images/no-data-found.png";

import * as XLSX from "xlsx";
import moment from "moment";

const AllBudgetList = () => {
  const [budgetListApi, setBudgetList] = useState([]);
  const [reportListExportData, setReportListExportData] = useState([]);
  console.log("budgetListApi", budgetListApi);

  useEffect(() => {
    getReportList()
      .then((res) => {
        if (res.status === 200 && res.data) setBudgetList(res.data.tickets);
      })
      .catch((err) => err);
    getReportListExport()
      .then((res) => {
        if (res.status === 200 && res.data)
          setReportListExportData(res.data.tickets);
      })
      .catch((err) => err);
  }, []);

  //download data as exel
  const exportBudgetSheet = (e) => {
    let Heading = [["Region", "Business Function"]];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(reportListExportData);
    XLSX.utils.sheet_add_aoa(worksheet, Heading);
    // XLSX.utils.sheet_add_aoa(worksheet);
    // XLSX.utils.sheet_add_json(worksheet, arr, { origin: 'A2', skipHeader: true });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(
      workbook,
      "BB-Budget-Report-" +
        moment(new Date()).format("YYYY-MM-DD-HH-mm-ss") +
        ".xlsx"
    );
  };
  return (
    <div className="budget-view-main">
      <div className="budget-view-body ">
        <div className="budget-view">
          {budgetListApi?.length > 0 ? (
            <>
              {" "}
              <div className="download-btn">
                <button onClick={exportBudgetSheet}>
                  <img
                    onClick={exportBudgetSheet}
                    src={downloadIcon}
                    alt="download"
                  />
                  Export
                </button>
              </div>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Department</th>
                    <th>Practice Name</th>
                    <th>Cost Center Owner</th>
                    <th>Project Name</th>
                    {/* <th>Customer Type</th> */}
                    {/* <th>Customer</th> */}
                    <th>Budget Type</th>
                    <th>Cost Center</th>
                    <th>Item Description</th>
                    <th>Currency</th>
                    <th>Oct-24</th>
                    <th>Nov-24</th>
                    <th>Dec-24</th>
                    <th>Total</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetListApi?.map((item, i) => (
                    <tr>
                      <td title={item.region}>
                        {item.region ? item.region : "--"}
                      </td>
                      <td title={item.business_function} className="truncate">
                        {item.business_function ? item.business_function : "--"}
                      </td>
                      <td title={item.practice_name}>
                        {item.practice_name ? item.practice_name : "--"}
                      </td>
                      <td title={item.cost_center_owner}>
                        {item.cost_center_owner ? item.cost_center_owner : "--"}
                      </td>
                      <td title={item.project_name}>
                        {item.project_name ? item.project_name : "--"}
                      </td>
                      {/* <td title={item.customer_type} className="truncate">
                        {item.customer_type}
                      </td> */}
                      {/* <td title={item.customer} className="truncate">
                        {item.customer}
                      </td> */}
                      <td title={item.budget_type}>
                        {item.budget_type ? item.budget_type : "--"}
                      </td>
                      <td title={item.cost_center}>
                        {item.cost_center ? item.cost_center : "--"}
                      </td>
                      <td title={item.item_description}>
                        {item.item_descriptionitem
                          ? item.item_descriptionitem
                          : "--"}
                      </td>
                      <td title={item.currency}>
                        {item.currency ? item.currency : "--"}
                      </td>
                      <td title={item.month_1}>
                        {item.month_1 ? item.month_1 : "--"}
                      </td>
                      <td title={item.month_2}>
                        {item.month_2 ? item.month_2 : "--"}
                      </td>
                      <td title={item.month_3}>
                        {item.month_3 ? item.month_3 : "--"}
                      </td>
                      <td title={item.budget_total}>
                        {item.budget_total ? item.budget_total : "--"}
                      </td>
                      <td title={item.remarks}>
                        {item.remarks ? item.remarks : "--"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="no-data-found">
              <p>No Data Found</p>
              <img src={noDataFoundIcon} alt="nodata" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBudgetList;
