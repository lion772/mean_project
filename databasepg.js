const { Pool, Client } = require("pg");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
} = require("./secrets");

console.log(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT);

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

const client = new Client({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

client.connect();

/*pool.query(
  "CREATE TABLE post (id INT, name VARCHAR(255) NOT NULL)",
  (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log("***************************************");
    console.log("POOL");
    console.log("***************************************");
    console.log(res);
    client.end;
  }
);*/

pool.query("select * from post", (err, res) => {
  if (err) {
    console.log(err);
  }
  console.log("***************************************");
  console.log("POOL");
  console.log("***************************************");
  console.log(res.rows);
  client.end;
});

module.exports = client;
