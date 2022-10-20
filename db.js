const { createPool } = require("mysql");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = require("./secrets");
require("dotenv").config();

// Postgres Configuration
const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

pool.query("select * from posts", (err, results) => {
  return console.log(res);
});

app.get(`http:localhost:4300/posts`, (req, res) => {
  console.log("database will be retrieved ");
  (async () => {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  })().catch((err) => {
    res.json(err.stack);
  });
});
