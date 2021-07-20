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
    console.log(choices);
    // return new Promise((resolve, reject) => {
    //     inquirer.prompt([
    //         {
    //             type: 'list',
    //             message: 'What is the Employee\'s role?',
    //             name: 'empRole',
    //             choices: choices,
    //         },
    //     ]).then(({ role }) => {
    //         console.log(role);
    //         resolve();
    //     });
    // });
}

const getEmployeeRoles = () => {
    return new Promise((resolve, reject) => {
        connection.query('select title from role', (err, res) => {
            if (err) reject(err);
            resolve(res);
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
        choices: viewEmployeeRoles(),
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
        type: 'input',
        message: 'Department:',
        name: 'roleDept',
    },
];


module.exports = {
    empQuestions,
    deptQuestions,
    roleQuestions
}