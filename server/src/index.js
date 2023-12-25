const app = require("./app");
const { sequelize } = require("./database/database");
const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await sequelize.sync({force: false});
    app.listen(PORT, () => {
      console.log("Server listening on PORT:", PORT);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();