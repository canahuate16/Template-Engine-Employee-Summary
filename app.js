
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const util = require("util");
util.promisify(fs.writeFile);

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
                writeHTML();
            }

        })
}
//Engineer questions
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
            teamMembers.push(newEmployee)
            console.log(teamMembers);
            selectMember()
        })
}
//intern questions 
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
            
        })
}

function writeHTML() {
    fs.writeFile("team.html", render(teamMembers), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!")
    })
}

start();
