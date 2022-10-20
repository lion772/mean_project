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

/*pool.query("DROP TABLE post IF EXISTS post", (err) => {
  if (err) console.log(err);
  pool.end;
});

pool.query(
  "CREATE TABLE post (id SERIAL PRIMARY KEY, title VARCHAR(255), content VARCHAR(255))",
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

module.exports.insertPost = function (title, content) {
  pool.query(
    "insert into post (title, content) values ($1, $2) returning *",
    [title, content],
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    }
  );
};

module.exports.getPosts = function () {
  return (async () => {
    const client = await pool.connect();
    try {
      return await client.query("SELECT * FROM post");
    } catch (err) {
      console.log(err.stack);
    } finally {
      client.release();
    }
  })();
};
/*return pool.connect().then((client) => {
    return client
      .query("SELECT * FROM post")
      .then((res) => {
        client.release();
        console.log(res.rows);
        return res.rows;
      })
      .catch((err) => {
        client.release();
        console.log(err.stack);
      });
  });*/
