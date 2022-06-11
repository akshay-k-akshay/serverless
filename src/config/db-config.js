const { connect, connection } = require("mongoose");

const { config } = require("./app-config");
const { logger } = require("./winston");

// dbUrl and credentials
const dbUrl = config.get("db.url");

// default params for mongodb
const params = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports = {
  dbConfig: () => {
    connect(`${dbUrl}`, params);

    connection.on("connected", function () {
      logger.info(`DB has been connected to ${dbUrl}`);
    });
  }
};
