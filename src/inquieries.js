const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'RiMsS!997^&*',
    database: 'EmployeeTrackerDB',
});

const viewEmployeeRoles = async () => {
    const choices = await getEmployeeRoles();
    return choices;
}

const getEmployeeRoles = () => {
    return new Promise((resolve, reject) => {
        connection.query('select title, id from role', (err, res) => {
            if (err) reject(err);
            if(res) {
                resolve(res);
            }
            else {
                const issue = new Error();
                reject(issue);
            }
        });
    });
}

const viewCompanyDepartments = async () => {
    const depts = await getCompanyDepartments();
    return depts;
}

const getCompanyDepartments = () => { 
    return new Promise((resolve, reject) => {
        connection.query('select name, id from department', (err, res) => {
            if (err) reject(err);
            if(res) {
                resolve(res);
            }
            else {
                const issue = new Error();
                reject(issue);
            }
        });
    });
}

const empQuestions = [
    {
        type: 'input',
        message: 'What is the Employee\'s first name?',
        name: 'empFirst',
    },
    {
        type: 'input',
        message: 'What is the Employee\'s last name?',
        name: 'empLast',
    },
    {
        type: 'list',
        message: 'What is the Employee\'s role?',
        name: 'empRole',
        //choices: viewEmployeeRoles(),
    },
];

const deptQuestions = [
    {
        type: 'input',
        message: 'Enter the name for the new department.',
        name: 'deptName',
    }
];


const roleQuestions = [
    {
        type: 'input',
        message: 'Role title:',
        name: 'roleTitile',
    },
    {
        type: 'input',
        message: 'Salary:',
        name: 'roleSalary',
    },
    {
        type: 'list',
        message: 'Department:',
        name: 'roleDept',
    },
];


module.exports = {
    empQuestions,
    deptQuestions,
    roleQuestions,
    viewEmployeeRoles, 
    viewCompanyDepartments
}