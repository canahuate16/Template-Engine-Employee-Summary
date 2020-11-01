const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
require 
class Engineer extends Employee {
    constructor(name, id, email, github) {
        this.name = name
        this.id = id;
        this.email = email;
        this.github = github;
    }
}

module.exports = Engineer;