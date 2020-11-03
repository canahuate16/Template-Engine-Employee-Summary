const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super (name,id,email)
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer"
    }
}
const Bob = new Engineer('bob', 50, 'some@gmail.com', 'coolBob');
console.log(Bob.getName());
module.exports = Engineer;