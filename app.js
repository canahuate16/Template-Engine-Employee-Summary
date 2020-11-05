
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const util = require("util");
util.promisify(fs.writeFile);



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

let teamMembers = [];

function start() {
    //adds a manager
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },

        {
            type: "input",
            name: "id",
            message: "What is the manager's id?"
        },

        {
            type: "input",
            name: "email",
            message: "What is the manager's email?"
        },

        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        }

    ])

        .then((managerData) => {
           
            const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
            teamMembers.push(manager);
            console.log(managerData);
            selectMember();

        })
}
//asks to select a new employee type

function selectMember() {
    inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "What type of employee are you adding?",
            choices: [
                'Engineer',
                'Intern',
                'Manager',
                'Submit'

            ]
        }

    ])
        .then((answer) => {
            if (answer.employeeType === 'Engineer') {
                createEngineer()
            } else if (answer.employeeType === 'Intern') {
                createIntern()

            } else if (answer.employeeType === 'Manager') {
                start()

            } else {
                render(teamMembers)
            }

        })
}
function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's github?"
        }

    ])

        .then((data) => {
            console.log(data)
            const newEmployee = new Engineer(data.name, data.id, data.email, data.github);
            // teamMember.push (employee)
            //  console.log(employees);
            teamMembers.push(newEmployee)
            console.log(teamMembers);
            // makeTeam()
            selectMember()
        })
}

function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's ID"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?"
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?"
        }


    ])
        .then((data) => {
            const addIntern = new Intern(data.name, data.id, data.email, data.school);
            teamMembers.push(addIntern)
            console.log(teamMembers);
            selectMember()
            // makeTeam();
        })
}



// function makeTeam() {
//     if (!fs.existsSync(OUTPUT_DIR)) {
//         fs.mkdirSync(OUTPUT_DIR)
//       }
//  }
//  fs.writeFileSync(outputPath, render(teamMembers), "utf-8");

start();
