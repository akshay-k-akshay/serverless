const { connect, connection } = require("mongoose");

const { config } = require("./app-config");
const { logger } = require("./winston");

const env = config.get("node_env");

// dbUrl and credentials
const dbUrl = config.get("db.url");
const username = config.get("db.user");
const password = config.get("db.password");

// default params for mongodb
const params = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// if the environment is not dev then we need to set the credentials
if (env !== "dev") params.auth = { username, password };

module.exports = {
  dbConfig: () => {
    connect(`${dbUrl}`, params);

    connection.on("connected", function () {
      logger.info(`DB has been connected to ${dbUrl}`);
    });
  }
};
