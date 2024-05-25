const { Pool } = require("pg");

const pool = new Pool({
  user: "db_user",
  host: process.env.db_host,
  database: "db_prj",
  password: "db_1234",
  port: 5432,
});

module.exports = pool;
