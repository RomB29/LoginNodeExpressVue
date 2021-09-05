const db = require("../models");
const ROLES = db.ROLE;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
    
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
    /*
    Peut-on remplacé une promesse par un simple
    if user.findone ...
        if where ..
            res.status(400)..
    NON !! Car sinon le programme pourrait potentiellement se bloqué ?
    */

    
   // Email
   User.findOne({
     where: { 
        email: req.body.email,
     }
    }).then(user => {
        if (user) {
          res.status(400).send({
          message: "Failed! email is already in use!"
          });
          return;

        } 
    next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i =0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
    
  }
  next();
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;