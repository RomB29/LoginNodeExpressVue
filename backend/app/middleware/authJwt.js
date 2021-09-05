const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { user } = require("../models");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }
    /*
    METHOD example using promise with JWT
    jwt.verify(token, config.secret).then(decoded => {
        req.userId = decoded.id;
        next();
    })
    .catch(err => {
        return res.status(401).send({
            message: "Unauthorized"
        });
    });
    */

    /*
    // AWAIT fonctionne uniquement avec des promise
    // METHODE 1
    try {
        const decoded = await jwt.VerifyPromise(token, config.secret)
        req.userId = decoded.id;
        next();

    } catch (err) {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
    */
   
    /*
    // METHODE 2
    const decoded = await jwtVerifyPromise(token, config.secret).catch(err => {
       return res.status(401).send({
            message: "Unauthorized"
        }); 
    })
    req.userId = decoded.id;
    next();
    */

    
     // CallBack de jwt.verify (return 2 parameters: error ou decoded qui peuvent être appelés différemment)
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        console.log('decoded', decoded)
        req.userId = decoded.id;
        next();
    });    
};

/*

// From CALLback to promise function

const jwtVerifyPromise = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err)
            }
            resolve(decoded)
        });
        
    })
}

*/

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            /*
            On parcourt la liste possible des rôles jusqu'à avoir role = admin
            Sinon, on retourne le status 403 contenant le message
            "Require Admin Role!"
            */
            for(let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role! "
            });
            return;
        });

    });
};
isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            /*
            On parcourt la liste possible des rôles jusqu'à avoir role = admin
            Sinon, on retourne le status 403 contenant le message
            "Require Admin Role!"
            */
            for(let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator Role! "
            });
            return;
        });

    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
  
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Moderator or Admin Role!"
        });
      });
    });
  };
  
  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
  };
  module.exports = authJwt;