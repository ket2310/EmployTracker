const mysql = require('mysql');
const inquirer = require('inquirer');
const ctable = require('console.table');
const questions = require('./src/inquieries')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'RiMsS!997^&*',
    database: 'EmployeeTrackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database')
    completeTask();
});

const completeTask = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Add departments',
                'Add roles',
                'Add employees',
                'View departments',
                'View roles',
                'View employees',
                'Update roles'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                // case 'Find songs by artist':
                //   artistSearch();
                //   break;
                case 'Add departments':
                    addDepartment();
                    break;
                case 'Add roles':
                    addRole();
                    break;
                case 'Add employees':
                    addEmployee();
                    break;
                case 'View departments':
                    viewDepartments();
                    break;
                case 'View roles':
                    viewRoles();
                    break;
                case 'View employees':
                    console.log('\n')
                    viewEmployees();
                    break;
                case 'Update roles':
                    updateRoles();
                    break;
                default:
                    console.log(`Invalid action: ${answer.action}`);
            }
        });
};

const viewEmployees = () => {
    const query = ' SELECT first_name, last_name, role_id, manager_id FROM Employees';
    connection.query(query, (err, res) => {
        console.log(ctable.getTable(res));
    });
    completeTask();
};

const viewRoles = () => {
    const query = ' SELECT * FROM ROLE';
    connection.query(query, (err, res) => {
        console.log(ctable.getTable(res));
    });
    completeTask();
}

const viewDepartments = () => {
    const query = ' SELECT * FROM department';
    connection.query(query, (err, res) => {
        console.log(ctable.getTable(res));
    });
    completeTask();
}

///////////////////////////////////////////////////////////////////////////////////

const addEmployee = async () => {

    let roles = await questions.viewEmployeeRoles();
    roles = roles.map(role => ({ name: role.title, value: role.id }));

    let questionToAsk = questions.empQuestions;
    questionToAsk[2].choices = roles;

    inquirer.prompt(questionToAsk).then((answer) => {
        console.log(answer);
        connection.query(
            'INSERT INTO Employees SET ?',
            {
                first_name: `${answer.empFirst}`,
                last_name: `${answer.empLast}`,
                role_id: `${answer.empRole}`
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} Employee inserted!\n`);
            }
        );
        completeTask();
    })
}

const addDepartment = () => {
    inquirer.prompt(questions.deptQuestions).then((answer) => {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: `${answer.deptName}`,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} Department inserted!\n`);
            }
        );
        completeTask();
    })
}

const addRole = async () => {
    let depts = await questions.viewCompanyDepartments();
    depts = depts.map(dept => ({ name: dept.name, value: dept.id }));

    let questionToAsk = questions.roleQuestions;    
    questionToAsk[2].choices = depts;

    inquirer.prompt(questionToAsk).then((answer) => {
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: answer.roleTitle,
                salary: answer.roleSalary,
                department_id: answer.roleDept
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} Role inserted!\n`);
            }
        );
        completeTask();
    })
}

const updateRoles = async () => {
    let depts = await questions.viewCompanyDepartments();
    depts = depts.map(dept => ({ name: dept.name, value: dept.id }));

    let questionToAsk = [{
        type: 'input',
        message: 'Salary:',
        name: 'roleSalary',
    },
    {
        type: 'list',
        message: 'Department:',
        name: 'roleDept',
    },
    ]
    questionToAsk[1].choices = depts;

    // Choose the role we want to update.
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'rolTitle',
                    type: 'rawlist',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({ title }) => {
                            choiceArray.push(title);
                        });
                        return choiceArray;
                    },
                    message: 'What role would you like to update?',
                },
            ]).then((answer) => {
                // get the information of the chosen item
                let chosenRole;
                results.forEach((role) => {
                    if (role.title === answer.rolTitle) {
                        chosenRole = role;
                    }
                });
                inquirer.prompt(questionToAsk).then((answer) => {

                    connection.query(
                        'UPDATE role SET ?, ?  WHERE ?',
                        [
                            {
                                salary: answer.roleSalary,
                            },
                            {
                                department_id: answer.roleDept,
                            },
                            {
                                id: chosenRole.id,
                            },
                        ],
                        (error) => {
                            if (error) throw err;
                            console.log(`${res.affectedRows} Role Updated\n`);
                        }
                    )
                    completeTask();
                });

            })
    });

}
