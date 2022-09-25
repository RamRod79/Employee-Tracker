INSERT INTO department (id, name)
VALUES (01, "Engineering"),
       (02, "Finance"),
       (03, "Legal"),
       (04, "Sales");


INSERT INTO role (id, title, salary, department_id)
VALUES (01, "Sales Lead", 100000, "Sales"),
       (02, "Sales Person", 80000, "Sales"),
       (03, "Lead Engineer", 150000, "Engineering"),
       (04, "Software Engineer", 120000, "Engineering"),
       (05, "Account Manager", 160000, "Finance"),
       (06, "Accountant", 125000, "Finance"),
       (07, "Legal Team Lead", 250000, "Legal");
       (08, "Lawyer", 190000, "Legal");

INSERT INTO employee (id, first_name, last_name, title, role_id, manager_id)
VALUES (01,"John", "Doe", "Sales Lead", NULL ),
       (02,"Mike", "Chan", "Salesperson", "John Doe"),
       (03,"Ashley", "Rodriguez", "Lead Engineer", NULL),
       (04,"Kevin", "Tupik", "Software Engineer", "Ashley Rodriguez"),
       (05,"Kunal", "Singh", "Account Manager", NULL),
       (06,"Malia", "Brown", "Accountant", "Kunal Singh"),
       (07,"Sarah", "Lourd", "Legal Team Lead", null);
       (08,"Tom", "Allen", "Lawyer", "Sarah Lourd");