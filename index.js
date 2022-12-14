const mysql = require("mysql2");
const express = require("express");
const inquirer = require("inquirer");
require("console.table");
const db = require("./db/db.js");


// Main menu function for options
function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Update Employee Manager",
        // "View Employee Manager",
        "View Employee Department",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "Quit",
      ],
    })

    // Switch Case for selections of functions
    .then(answer => {
      switch (answer.menu) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployees();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepts();
          break;
        case "Add Department":
          addDept();
          break;
        case "Update Employee Manager":
          updateEmployeeMngr();
          break;
        // case "View Employee Manager":
        //   viewEmployeeMngr();
        //   break;
        case "View Employee Department":
          viewEmployeeDept();
          break;
        case "Delete Department":
          deleteDept();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
          default:
            process.exit()
      }
    })
};

// function for viewing all employees
function viewAllEmployees() {
    const sql = `SELECT employee.id, employee.first_name AS "first name", employee.last_name 
    AS "last name", role.title, department.department_name AS department, role.salary, 
    concat(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee manager
    ON manager.id = employee.manager_id`;

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    console.table(result);
    mainMenu();
  });
};

// function for adding employees
function addEmployees() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter the first name of the new employee.",
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter the last name of the new employee.",
      },
      {
        name: "role_id",
        type: "number",
        message:
          "Enter the role id associated with the new employee (Enter Numbers only).",
      },
      {
        name: "manager_id",
        type: "number",
        message:
          "Enter the manager's id associated with the new employee (Enter Numbers only).",
      },
    ])
    .then(function (response) {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          response.first_name,
          response.last_name,
          response.role_id,
          response.manager_id,
        ],
        function (err, data) {
          if (err) throw err;
          console.log("The new employee entered has been successfully added.");

          db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) {
              res.status(500).json({ error: err.message });
              mainMenu();
            }
            console.table(result);
            mainMenu();
        });
    })
});
};

// function for updating employee roles
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message:
          "Enter the first name of the employee you want update their role.",
      },
      {
        name: "role_id",
        type: "number",
        message:
          "Enter the new role number id associated with the employee you want to update (Enter Numbers only).",
      },
    ])
    .then(function (response) {
      db.query(
        "UPDATE employee SET role_id = ? WHERE first_name = ?",
        [response.role_id, response.first_name],
        function (err, data) {
          if (err) throw err;
          console.log("The new role has been added successfully.");

          db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) {
              res.status(500).json({ error: err.message });
              mainMenu();
            }
            console.table(result);
            mainMenu();
        });
    })
});
};

// function for viewing all roles
function viewAllRoles() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    mainMenu();
  });
};

// function for adding roles
function addRole() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Enter the title of role you want to add.",
        },
        {
          name: "salary",
          type: "input",
          message:
            "Enter the salary associated with the role you want to add (Enter Numbers Only)",
        },
        {
          name: "department_id",
          type: "number",
          message:
            "Enter the department id associated with the role being added.",
        },
      ])
      .then(function (response) {
        db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [response.title, response.salary, response.department_id],
          function (err, data) {
            if (err) throw err;
            console.log("The new role has been successfully added.");

            db.query(`SELECT * FROM role`, (err, result) => {
              if (err) {
                res.status(500).json({ error: err.message });
                mainMenu();
              }
              console.table(result);
              mainMenu();
            });
        })
});
};

// function for viewing all departments
function viewAllDepts() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    mainMenu();
  });
};

// function for adding departments
function addDept() {
  inquirer
    .prompt([
      {
        name: "department_name",
        type: "input",
        message: "Enter the name of the department being added.",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (department_name)
                VALUES (?)`;
      const params = [answer.department_name];
      db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log("The new department has been successfully added.");

        db.query(`SELECT * FROM department`, (err, result) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          console.table(result);
          mainMenu();
        });
    });
});
};

// function for updating employee manager
function updateEmployeeMngr() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter the first name of the employee being updated.",
      },
      {
        name: "manager_id",
        type: "number",
        message:
          "Enter the new manager's id number associated with the employee being updated (Enter Numbers only).",
      },
    ])
    .then(function (response) {
      db.query(
        "UPDATE employee SET manager_id = ? WHERE first_name = ?",
        [response.manager_id, response.first_name],
        function (err, data) {
          if (err) throw err;
          console.log("The new manager's id has been successfully added.");

          db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) {
              res.status(500).json({ error: err.message });
              mainMenu();
            }
            console.table(result);
            mainMenu();
        });
    })
});
};

// function for viewing employee manager
// function viewEmployeeMngr() {
//   const sql = `  SELECT 
//                     CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager,
//                     employee.id, 
//                     employee.first_name, 
//                     employee.last_name,  
//                     roles.title AS Title,
//                     department.department_name, 
//                     roles.salary
//                     FROM employee 
//                     JOIN roles ON employee.role_id = roles.id
//                     JOIN department ON roles.department_id = department.id
//                     LEFT JOIN  employee AS manager ON employee.manager_id = manager.id
//                     ORDER BY manager`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     console.table(result);
//     mainMenu();
//   });
// };

// function for viewing employee Department
function viewEmployeeDept() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
    mainMenu();
  });
};

// function for deleting department
function deleteDept() {
  inquirer
    .prompt([
      {
        name: "department_id",
        type: "number",
        message:
          "Enter the id of the department you want to delete (Enter Numbers Only).",
      },
    ])
    .then(function (response) {
      db.query(
        "DELETE FROM department WHERE id = ?",
        [response.department_id],
        function (err, data) {
          if (err) throw err;
          console.log(
            "The department entered has been deleted successfully from the database."
          );

          db.query(`SELECT * FROM department`, (err, result) => {
            if (err) {
              res.status(500).json({ error: err.message });
              mainMenu();
            }
            console.table(result);
            mainMenu();
        });
    })
});
};

// function for deleting role
function deleteRole() {
  inquirer
    .prompt([
      {
        name: "role_id",
        type: "number",
        message:
          "Enter the id of the role you want to delete (Enter Numbers Only).",
      },
    ])
    .then(function (response) {
      db.query(
        "DELETE FROM role WHERE id = ?",
        [response.role_id],
        function (err, data) {
          if (err) throw err;
          console.log("The role entered has been successfully deleted.");

          db.query(`SELECT * FROM role`, (err, result) => {
            if (err) {
              res.status(500).json({ error: err.message });
              mainMenu();
            }
            console.table(result);
            mainMenu();
        });
    })
});
};

// function for deleting employee
function deleteEmployee() {
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "number",
        message:
          "Enter the id of the employee you want to delete (Enter Numbers Only).",
      },
    ])
    .then(function (response) {
      db.query(
        "DELETE FROM employee WHERE id = ?",
        [response.employee_id],
        function (err, data) {
          if (err) throw err;
          console.log("The employee entered has been successfully deleted.");

          db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) {
              res.status(500).json({ error: err.message });
              mainMenu();
            }
            console.table(result);
            mainMenu();
        });
    })
});
};

mainMenu();

