import mysql from "mysql2/promise";

console.log("before the try in db.js");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "db_bookini",
});
export default db;
