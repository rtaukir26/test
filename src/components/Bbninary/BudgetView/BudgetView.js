import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routePath from "../../../routes/routePath";
import {
  getBudgetList,
  getBudgetListExport,
} from "../../../services/budgetViewServices";
import downloadIcon from "../../../assets/images/file.png";
import noDataFoundIcon from "../../../assets/images/no-data-found.png";
import * as XLSX from "xlsx";
import moment from "moment";

const BudgetView = () => {
  const [budgetListApi, setBudgetList] = useState([]);
  const [budgetListExportData, setBudgetListExportData] = useState([]);
  console.log("budgetListApi", budgetListApi);
  console.log("budgetListExportData", budgetListExportData);

  useEffect(() => {
    getBudgetList()
      .then((res) => {
        if (res.status === 200 && res.data) setBudgetList(res.data.viewData);
      })
      .catch((err) => err);
    getBudgetListExport()
      .then((res) => {
        console.log("res", res);
        if (res.status === 200 && res.data)
          setBudgetListExportData(res.data.tickets);
      })
      .catch((err) => err);
  }, []);

  //download data as exel
  const exportBudgetSheet = (e) => {
    let Heading = [["SNo", "Region", "Department"]];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(budgetListExportData);
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

    // setLoader(true);
    // getBudgetExportData()
    //   .then((response) => {
    //     setBudgetSheet(response?.result);
    //     if (response?.result?.length > 0) {
    //       // document.getElementById('tableToExcel').click();
    //       // console.log(response?.result);
    //       // setLoader(false);
    //       // return true;
    //       let arr = response?.result?.map((d) => {
    //         delete d.project_serial_number;
    //         return d;
    //       });

    //       let Heading = [["Project Name", "Cost Centre Code", "Budget"]];
    //       const workbook = XLSX.utils.book_new();
    //       const worksheet = XLSX.utils.json_to_sheet(arr);

    //       // worksheet['A1'].v='Cost Centre Code';
    //       // worksheet['A1'].s = {fill:{fgColor: {rgb:"86BC25"}}};
    //       // console.log('worksheet', worksheet);
    //       XLSX.utils.sheet_add_aoa(worksheet, Heading);
    //       // XLSX.utils.sheet_add_json(worksheet, arr, { origin: 'A2', skipHeader: true });
    //       XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //       XLSX.writeFile(
    //         workbook,
    //         "Cost-Centres-Budget-" +
    //           moment(new Date()).format("YYYY-MM-DD-HH-mm-ss") +
    //           ".xlsx"
    //       );
    //     }
    //     setTimeout(() => {
    //       setLoader(false);
    //     }, 2000);
    //   })
    //   .catch((err) => {
    //     setLoader(false);
    //     toast.dismiss();
    //     toast.error(err?.data?.message);
    //   });
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
                    <th>Customer Type</th>
                    <th>Customer</th>
                    <th>Budget Type</th>
                    <th>Item Description</th>
                    <th>Cost Center</th>
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
                      <td title={item.region}>{item.region}</td>
                      <td title={item.business_function} className="truncate">
                        {item.business_function}
                      </td>
                      <td title={item.practice_name}>{item.practice_name}</td>
                      <td title={item.cost_center_owner}>
                        {item.cost_center_owner}
                      </td>
                      <td title={item.project_name}>{item.project_name}</td>
                      <td title={item.customer_type} className="truncate">
                        {item.customer_type}
                      </td>
                      <td title={item.customer} className="truncate">
                        {item.customer}
                      </td>
                      <td title={item.budget_type}>{item.budget_type}</td>
                      <td title={item.item_description}>
                        {item.item_description}
                      </td>
                      <td title={item.cost_center}>{item.cost_center}</td>
                      <td title={item.currency}>{item.currency}</td>
                      <td title={item.month_1}>{item.month_1}</td>
                      <td title={item.month_2}>{item.month_2}</td>
                      <td title={item.month_3}>{item.month_3}</td>
                      <td title={item.budget_total}>{item.budget_total}</td>
                      <td title={item.remarks}>{item.remarks}</td>
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

export default BudgetView;
