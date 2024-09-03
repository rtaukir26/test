import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routePath from "../../../routes/routePath";
import { getBudgetList } from "../../../services/budgetViewServices";

const BudgetView = () => {
  const [budgetListApi, setBudgetList] = useState([]);
  console.log("budgetListApi", budgetListApi);

  useEffect(() => {
    getBudgetList()
      .then((res) => {
        if (res.status == 200 && res.data) setBudgetList(res.data.viewData);
      })
      .catch((err) => err);
  }, []);

  return (
    <div className="budget-view-main">
      <div className="budget-view-body ">
        <div className="budget-view">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Department</th>
                <th>Practice Name</th>
                <th>Const Center Owner</th>
                <th>Project Name</th>
                <th>Customer Type</th>
                <th>Customer</th>
                <th>Budget Type</th>
                <th>Item Description</th>
                <th>Cost Center</th>
                <th>Currency</th>
                <th>Oct-24</th>
                <th>Nov-24</th>
                <th>Des-24</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {budgetListApi?.map((item, i) => (
                <tr>
                  <td>{item.region}</td>
                  <td>{item.business_function}</td>
                  <td>{item.practice_name}</td>
                  <td>{item.cost_center}</td>
                  <td>{item.project_name}</td>
                  <td>{item.customer_type}</td>
                  <td>{item.customer}</td>
                  <td>{item.budget_type}</td>
                  <td>{item.item_description}</td>
                  <td>{item.cost_center}</td>
                  <td>{item.currency}</td>
                  <td>{item.month_1}</td>
                  <td>{item.month_2}</td>
                  <td>{item.month_3}</td>
                  <td>{item.budget_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetView;
