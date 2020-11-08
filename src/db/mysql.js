const mysql = require("mysql");
const config = require("../config.json");
const InvalidValueError = require("../errors/invalid_value_error");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || config.db.mysql.host,
  user: process.env.DB_USER || config.db.mysql.user,
  password: process.env.DB_PASS || config.db.mysql.password,
  database: process.env.DB_NAME || config.db.mysql.database,
  typeCast: function castField(field, useDefaultTypeCasting) {
    if (field.type === "BIT" && field.length === 1) {
      const bytes = field.buffer();
      if (bytes == null) return null;
      return bytes[0] === 1;
    }
    return useDefaultTypeCasting();
  },
});

exports.doQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) return reject(new InvalidValueError(error));
      return resolve(results);
    });
  });
};

exports.connection = connection;

exports.toMysqlDateTime = (date) =>
  date.toISOString().slice(0, 19).replace("T", " ");
