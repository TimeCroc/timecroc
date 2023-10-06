// require EventEmitter
const EventEmitter = require('events');

// 
class EmployeeManager extends EventEmitter {
  constructor() {
    super();
    this.activeEmployees = [];
  }

  // addSession(employeeData) {
  //   this.activeEmployees.push(employeeData);
  //   this.emit('employeeAdded', employeeData);
  // }

  async addSession(employeeData) {
    return new Promise((resolve, reject) => {
      // Your asynchronous logic here
      // Resolve or reject the promise based on the result
      this.activeEmployees.push(employeeData);
      this.emit('employeeAdded', employeeData);
      resolve(); // Example: Resolve without any value if successful
    });
  }

  // removeSession(pin) {
  //   const index = this.activeEmployees.findIndex((employee) => employee.pin === pin);
  //   if (index !== -1) {
  //     const removedEmployee = this.activeEmployees.splice(index, 1)[0];
  //     this.emit('employeeRemoved', removedEmployee);
  //   }
  // }

  async removeSession(pin) {
    return new Promise((resolve, reject) => {
      // Your asynchronous logic here
      // Resolve or reject the promise based on the result
      const index = this.activeEmployees.findIndex((employee) => employee.pin === pin);
      if (index !== -1) {
        const removedEmployee = this.activeEmployees.splice(index, 1)[0];
        this.emit('employeeRemoved', removedEmployee);
        resolve(); // Example: Resolve without any value if successful
      } else {
        reject(new Error('Employee not found'));
      }
    });
  }
}

const employeeManager = new EmployeeManager();

module.exports = employeeManager;