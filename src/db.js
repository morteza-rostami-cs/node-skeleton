import Database from "better-sqlite3";
import config from "./config.js";

// sqlite connection
function createDatabase() {
  const db = new Database(config.dbPath);

  console.log("sqlite database connected.");

  return db;
}

export default createDatabase;
