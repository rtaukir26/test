const mysqlConnection = require("../config/mySqlconnection");
const moment = require("moment");
const nodeEnvConfig = require("../nodeEnvConfig");
nodeEnvConfig.envConfig();
let datetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");

/**
 * Service to get department filter for budget app
 * @param {number} userId - The ID of the user
 * @returns {Promise} - A promise that resolves with the list of tickets including the assigned user's name and comments
 */
const getDepartmentFilterService = async () => {
  return new Promise((resolve, reject) => {
    const query = `
         SELECT * FROM main_businessunits WHERE isactive='1'
        `;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return reject(
          new Error(`getDepartmentFilterService query failed: ${err.message}`)
        );
      }
      console.log(result, "lll");
      resolve(result);
    });
  });
};

/**
 * Service to get
 * @param {number} userId - The ID of the user
 * @returns {Promise} - A promise that resolves with the list of tickets including the assigned user's name and comments
 */
const getPraticeFilterService = async (unitId) => {
  return new Promise((resolve, reject) => {
    console.log(unitId, "id");
    const query = `
SELECT * FROM main_departments WHERE isactive='1' AND unitid='${unitId}';        `;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return reject(
          new Error(`getPracticeFilterService query failed: ${err.message}`)
        );
      }
      resolve(result);
    });
  });
};

/**
 * Service to get
 * @param {number} userId - The ID of the user
 * @returns {Promise} - A promise that resolves with the list of tickets including the assigned user's name and comments
 */
const getCustomerFilterService = async () => {
  return new Promise((resolve, reject) => {
    const query = `
         SELECT
           id AS client_id,
           client_name,
           project_client_code,
           poc
         FROM tm_clients
         WHERE is_active = 1
         ORDER BY client_name ASC;
        `;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return reject(
          new Error(`getCustomerFilterService query failed: ${err.message}`)
        );
      }
      console.log(result, "lll");
      resolve(result);
    });
  });
};

const addBudgetDataService = async (data, created_by) => {
  return new Promise((resolve, reject) => {
    const is_active = true;
    // const created_by = "pravin.s@bluebinaries";
    const query = `
       INSERT INTO budget_master (region, business_function, practice_name, cost_center, project_name, customer, customer_type, currency, financial_year, f_quarter, created_on, is_active,created_by)
       VALUES (
        ${mysql.escape(data.region)}, 
        ${mysql.escape(data.business_function)}, 
        ${mysql.escape(data.practice_name)}, 
        ${mysql.escape(data.cost_center)}, 
        ${mysql.escape(data.project_name)}, 
        ${mysql.escape(data.customer)}, 
        ${mysql.escape(data.customer_type)}, 
        ${mysql.escape(data.currency)}, 
        ${mysql.escape(data.financial_year)}, 
        ${mysql.escape(data.f_quarter)}, 
        ${mysql.escape(datetime)}, 
        ${mysql.escape(is_active)},
        ${mysql.escape(created_by)}

     )
        `;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return reject(new Error(`add budget query failed: ${err.message}`));
      }
      const newId = result.insertId;
      console.log("Newly inserted row ID:", newId);
      const promises = [];

      for (let i = 0; i < data.child.length; i++) {
        // Define the SQL query with placeholders
        const query = `
          INSERT INTO budget_child 
          (master_Id, budget_type, item_description, cost_center, month_1, month_2, month_3, budget_total, remarks, created_on, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Define the values to insert using parameterized query
        const values = [
          newId,
          data.child[i].budget_type,
          data.child[i].item_description,
          data.child[i].cost_center,
          data.child[i].month_1,
          data.child[i].month_2,
          data.child[i].month_3,
          data.child[i].budget_total,
          data.child[i].remarks,
          datetime, // Assume datetime is defined elsewhere
          is_active, // Assume is_active is defined elsewhere
        ];

        // Push each promise to an array
        promises.push(
          new Promise((resolve, reject) => {
            mysqlConnection.query(query, values, (err, result) => {
              if (err) {
                return reject(
                  new Error(`Add budget query failed: ${err.message}`)
                );
              }
              console.log(result, "lll");
              resolve(result);
            });
          })
        );
      }

      console.log(result, "lll");
      resolve(result);
    });
  });
};

const updateBudgetDataService = async () => {
  return new Promise((resolve, reject) => {
    const query = `
         SELECT
           id AS client_id,
           client_name,
           project_client_code,
           poc
         FROM tm_clients
         WHERE is_active = 1
         ORDER BY client_name ASC;
        `;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return reject(new Error(`update budget query failed: ${err.message}`));
      }
      console.log(result, "lll");
      resolve(result);
    });
  });
};

const viewBudgetDataService = async () => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM budget_master LEFT JOIN budget_child ON budget_child.master_Id = budget_master.id ORDER BY budget_master.id ASC;
        `;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
        return reject(new Error(`update budget query failed: ${err.message}`));
      }
      console.log(result, "lll");
      resolve(result);
    });
  });
};

/**
 * Service to return the token to the front end to validate the session
 * @param {Object} req - The data that contains the token
 * @returns {Promise} - A promise that resolves with the token
 */
const getSessionService = async (req) => {
  try {
    // Return a token
    const tokenValue = req.token;
    return tokenValue;
  } catch (err) {
    console.error("Error in getSessionService:", err);
    throw err;
  }
};

module.exports = {
  getDepartmentFilterService,
  getPraticeFilterService,
  getCustomerFilterService,
  addBudgetDataService,
  updateBudgetDataService,
  viewBudgetDataService,
  getSessionService,
};
