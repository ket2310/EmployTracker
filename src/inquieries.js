const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'RiMsS!997^&*',
    database: 'EmployeeTrackerDB',
});


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
        type: 'input',
        message: 'What is the Employee\'s role?',
        name: 'empRole',
        choices: connection.query('select * from role', (err, res) => {res}),
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