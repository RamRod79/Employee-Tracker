const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const conTable = require('console.table');
const db = require('./db/db');


function mainMenu() {
    inquirer
   .prompt([
{
   type: "list",
   name: "choice",
   message: "What would you like to do?",
    choices: [
        "View all Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Update Employee Manager",
        "View Employee Manager",
        "View Employee Department",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "Quit",

    ],
}
   ])

  .then(answer => {
   switch (answer.mainMenu) {
    case "View All Employees":
        viewAllEmployees();
        break;
    case 
   }
   
   
   
   
//     type: "list",
//    name: "choice",
//    message: "Which department does the role belong to?",
//     choices: [
//         "Engineering",
//         "Finance",
//         "Legal",
//         "Sales",
//     ],
// };

// function addRole() {
//     inquirer
//    .prompt([
// {
//    type: "list",
//    name: "choice",
//    message: "What is the Employee's role?",
//     choices: [
//         "Sales Lead",
//         "Salesperson",
//         "Lead Engineer",
//         "Software Engineer",
//         "Account Manager",
//         "Accountant",
//         "Legal Team Lead",
//         "Lawyer",
//     ],
// };

// function addManager() {
//     inquirer
//    .prompt([
// {
//    type: "list",
//    name: "choice",
//    message: "Who is the Employee's manager?",
//     choices: [
//         "None",
//         "John Doe",
//         "Mike Chan",
//         "Ashley Rodriguez",
//         "Kevin Tupik",
//         "Kunal Singh",
//         "Malia Brown",
//         ],
// };

// function updateRole() {
//     inquirer
//    .prompt([
// {
//    type: "list",
//    name: "choice",
//    message: "Which Employee's role do you want to update?",
//     choices: [
//         // "None",
//         // "John Doe",
//         // "Mike Chan",
//         // "Ashley Rodriguez",
//         // "Kevin Tupik",
//         // "Kunal Singh",
//         // "Malia Brown",
//         ],
// };

// function updateEmplyee() {
//     inquirer
//    .prompt([
// {
//    type: "list",
//    name: "choice",
//    message: "Which role do you want to assign the selected Employee?",
//     choices: [
//         // "None",
//         // "John Doe",
//         // "Mike Chan",
//         // "Ashley Rodriguez",
//         // "Kevin Tupik",
//         // "Kunal Singh",
//         // "Malia Brown",
//         ],
// };

// function addEmployee() {
//          inquirer
//         .prompt([
//     {
//         type: "input",
//         name: "first_name",
//         message: "What is the Employee's first name?",
//       },
    
//       {
//         type: "input",
//         name: "last_name",
//         message: "What is the Employee's last name?",
//       },
    
    //   {
    //     type: "input",
    //     name: "email",
    //     message: "What is the Manager's email?",
    //   },
    
    //   {
    //     type: "input",
    //     name: "officeNumber",
    //     message: "What is the Manager's office number?",
    //   },
    
    //    ]).then(function(answers) {
    //     const {id, email, name, officeNumber} = answers
    //     managers.push(new Manager(id, email, name, officeNumber));
    
    //     createTeam();
    //    })
    // }