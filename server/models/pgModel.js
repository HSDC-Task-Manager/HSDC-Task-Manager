const { Pool } = require("pg");

const PG_URI =
  "postgres://oqtccbpd:mtFVDYLt1SYpQyHQA4XXgilrgPgFV8-I@kashin.db.elephantsql.com/oqtccbpd";

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executing query", text, "with params: ", params);
    return pool.query(text, params, callback);
  },
};
