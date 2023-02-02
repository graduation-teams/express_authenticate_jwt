const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const sequelize = new Sequelize("authenticate_jwt", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = { sequelize, DataTypes };
