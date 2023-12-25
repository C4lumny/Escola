const { Sequelize } = require('sequelize')
const sequelize = new Sequelize("escoladb", "nathan", "090410", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = {
    sequelize,
}
