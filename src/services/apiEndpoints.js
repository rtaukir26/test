export const Base_url = process.env.REACT_APP_API_BASE_URL;

export const apiEndpoints = {
  departmentFilter: `${Base_url}/budget-app/department-filter`,
  practiceFilter: `${Base_url}/budget-app/practice-filter`,
  customerFilter: `${Base_url}/budget-app/customer-filter`,
  saveFilter: `${Base_url}/budget-app/add-budgetData`,
  viewBudgetData: `${Base_url}/budget-app/view-budgetData`,
  viewBudgetDataExport: `${Base_url}/budget-app/export-budgetData`,
  viewBudgetReport: `${Base_url}/budget-app/view-budgetReport`,
  viewBudgetReportExport: `${Base_url}/budget-app/export-budgetReport`,
};
