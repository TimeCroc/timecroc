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

  async addActiveEmployee(employeeData) {
    return new Promise((resolve, reject) => {
      // Your asynchronous logic here
      // Resolve or reject the promise based on the result
      this.activeEmployees.push(employeeData);
      this.emit('employeeAdded', employeeData);
      console.log('employeeManager.addSession: Success', employeeData);
      
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

  async removeActiveEmployee(employeeData) {
    return new Promise((resolve, reject) => {
       console.log('inside removeActiveEmployee', employeeData, 'employeeData')

        if (employeeData.shiftId) {
          const index = this.activeEmployees.findIndex((employee) => employee.shiftId === employeeData.shiftId);
          console.log('index', index)

          const removedEmployee = this.activeEmployees.splice(index, 1)[0];

          this.emit('employeeRemoved', removedEmployee);

          console.log('employeeManager.removeSession: Success', removedEmployee);
          console.log('current contents of activeEmployees array', employeeData);
          
          resolve(); // Example: Resolve without any value if successful
        } else {
        reject(new Error('Employee not found'));
        }
    });
  }

  // DOES AUTOCLOCKOUT LOGIC W/NODE-CRON LIVE HERE?  OR IN ITS OWN MIDDLEWARE?

}

const employeeManager = new EmployeeManager();

module.exports = employeeManager;