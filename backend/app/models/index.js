const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max    : config.pool.max,
            min    : config.pool.min,
            acquire: config.pool.acquire,
            idle   : config.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user_model.js")(sequelize,Sequelize); // require user_models nd run the exports objects 
db.role = require("./role_model.js")(sequelize,Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLE = ["user", "moderator", "admin"];
module.exports = db;

Sequelize.belongsToMany