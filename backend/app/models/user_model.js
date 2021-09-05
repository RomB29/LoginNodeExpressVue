/* module.exports can return an object as example
data.js 
module.exports = {
    firstName: 'James',
    lastName: 'Bond'
};
app.js 
var person = require('./data.js');
console.log(person.firstName + ' ' + person.lastName);

*/
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };