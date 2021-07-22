DROP DATABASE if exists EmployeeTrackerDB;

CREATE DATABASE EmployeeTrackerDB;

use EmployeeTrackerDB;

create TABLE Employees (
  id  INT NOT NULL auto_increment,
  first_name  VARCHAR(30) NULL,
  last_name  VARCHAR(30) NULL, 
  role_id  INT NULL,
  manager_id INT NULL ,
  PRIMARY KEY (id)
);

Insert into Employees (first_name, last_name, role_id, manager_id )
 values ('Mark', 'Hastings', 0,0);
Insert into Employees (first_name, last_name, role_id, manager_id ) values ('Steve', 'Pound', 0,0);
Insert into Employees (first_name, last_name, role_id, manager_id )values ('Philip', 'Hastings',  0,0);
Insert into Employees (first_name, last_name, role_id, manager_id )values ('Mary', 'Lambeth',  0,0);
Insert into Employees (first_name, last_name, role_id, manager_id )values ('Valarie', 'Vikings',  0,0);
Insert into Employees (first_name, last_name, role_id, manager_id )values ('John', 'Stanmore',  0,0);


CREATE TABLE Department (
  id int not NULL auto_increment,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

insert into department (name)
values('Human Resources');

insert into department (name)
values('Accounting');

insert into department (name)
values('Informaation Technology');

insert into department (name)
values('Legal');

CREATE TABLE Role (
  id int not NULL auto_increment,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) null,
  department_id int null,
  PRIMARY KEY (id)
);

insert into role (title, salary, department_id) 
values ('President', 0.0, 0);
insert into role (title, salary, department_id) values 
('Vice President', 0.0, 0);
insert into role (title, salary, department_id) values 
('CEO', 0.0, 0);
insert into role (title, salary, department_id) values ('Secretary', 0.0, 0);
