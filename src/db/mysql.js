const mysql = require("mysql");
const config = require("../config.json");
const InternalServerError = require("../errors/internal_server_error");
const connection = mysql.createConnection({
  host: config.db.mysql.host,
  user: config.db.mysql.user,
  password: config.db.mysql.password,
  database: config.db.mysql.database,
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
      if (error) return reject(new InternalServerError(error));
      return resolve(results);
    });
  });
};

exports.connection = connection;

exports.toMysqlDateTime = (date) =>
  date.toISOString().slice(0, 19).replace("T", " ");
