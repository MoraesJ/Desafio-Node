const pg = require("pg");
const express = require("express");
const app = express();
const port = 3000;

async function insert() {
  const client = new pg.Client({
    user: "root",
    database: "root",
    password: "root",
    port: 5432,
    host: "postgres",
  });
  await client.connect();
  await client.query(
    "CREATE TABLE IF NOT EXISTS people (id int NOT NULL, name varchar(255) NOT NULL)"
  );
  await client.query("INSERT INTO people (id, name) VALUES (1, 'Jefferson')");
  await client.query("INSERT INTO people (id, name) VALUES (2, 'Nome 2')");
  await client.query("INSERT INTO people (id, name) VALUES (3, 'Nome 3')");
  const result = await client.query("SELECT name FROM people");
  await client.query("DROP TABLE people");
  client.end();
  return result.rows;
}

app.get("/", async (req, res) => {
  const result = await insert();
  const names = result.map((people) => people.name);
  let listNames = "";
  names.forEach((name) => {
    listNames = listNames + name + "<br>";
  });
  res.send("<h1>Full Cycle Rocks!</h1><p>" + listNames + "</p>");
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
