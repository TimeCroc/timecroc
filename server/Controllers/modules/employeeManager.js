// require EventEmitter
const EventEmitter = require('events');

// 
class EmployeeManager extends EventEmitter {
  constructor() {
    super();
    this.activeEmployees = [];
  }

  async addActiveEmployee(employeeData) {
    return new Promise((resolve, reject) => {
      // Resolve or reject the promise based on the result
      this.activeEmployees.push(employeeData);
      this.emit('employeeAdded', employeeData);
      console.log('employeeManager.addSession: Success', employeeData);
      // Resolve without any value if successful
      resolve(); 
    });
  }

  async getActiveEmployees() {
    return new Promise((resolve, reject) => {
      console.log('this.activeEmployees inside getActiveEmployees - expect an array of obj', this.activeEmployees);
      // return this.activeEmployees;
      resolve();
    })
  }

  async removeActiveEmployee(employeeData) {
    return new Promise((resolve, reject) => {
       console.log('inside removeActiveEmployee', employeeData, 'employeeData')

        if (employeeData.shiftId) {
          const index = this.activeEmployees.findIndex((employee) => employee.shiftId === employeeData.shiftId);
          console.log('index', index)
          if (index !== -1) {
            const removedEmployee = this.activeEmployees.splice(index, 1)[0];
            this.emit('employeeRemoved', removedEmployee);
            console.log('employeeManager.removeSession: Success', removedEmployee);
          }
          console.log('current contents of activeEmployees array', this.activeEmployees);
          //Resolve without any value if successful
          resolve(); 
        } else {
        reject(new Error('Employee not found'));
        }
    });
  }

}

const employeeManager = new EmployeeManager();

module.exports = employeeManager;