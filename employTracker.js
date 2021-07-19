const mysql = require('mysql');
const inquirer = require('inquirer');
const ctable = require('console.table');

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
                    viewEmployees();
                    break;
                case 'Update roles':
                    updateRoles();
                default:
                    console.log(`Invalid action: ${answer.action}`);
            }
        });
};

const viewEmployees = () => {
    const query = ' SELECT * FROM Employees';
    connection.query(query, (err, res) => {
        console.log( ctable.getTable(res));
    });
    completeTask();
};

const viewRoles = () => {
    const query = ' SELECT * FROM ROLE';
    connection.query(query, (err, res) => {
        console.log( ctable.getTable(res));
    });
    completeTask();
}

const viewDepartments = () => {
    const query = ' SELECT * FROM department';
    connection.query(query, (err, res) => {
        console.log( ctable.getTable(res));
    });
    completeTask();
}

const addEmployee = () => {

    const query = connection.query(
        'INSERT INTO products SET ?',
        {
          flavor: 'Rocky Road',
          price: 3.0,
          quantity: 50,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} product inserted!\n`);
          // Call updateProduct AFTER the INSERT completes
        }
      );
    
}

const addDepartment= () => {

    const query = connection.query(
        'INSERT INTO department SET ?',
        {
          flavor: 'Rocky Road',
          price: 3.0,
          quantity: 50,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} product inserted!\n`);
        }
      );
    
}

const addRole = () => {

    const query = connection.query(
        'INSERT INTO products SET ?',
        {
          flavor: 'Rocky Road',
          price: 3.0,
          quantity: 50,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} product inserted!\n`);
        }
      );
    
}

const updateRoles = () => {

    const query = connection.query(
        'INSERT INTO products SET ?',
        {
          flavor: 'Rocky Road',
          price: 3.0,
          quantity: 50,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} product inserted!\n`);
        }
      );
    
}
