import express from "express";
import http from "node:http"; // node native http module

import config from "./config.js";
import registerUserRoutes from "./users/routes.js";
import createDatabase from "./db.js";
import { initializeDatabase } from "./schema.js";
import UserRepository from "./users/repository.js";

const apiPrefix = config.apiPrefix;

function registerRoutes(app, db, repositories) {
  // api routes -- any other route -- can be frontend
  app.get(`${apiPrefix}/health`, (req, res) => {
    res.json({ status: "ok", nodeEnv: config.nodeEnv });
  });

  // configs for frontend
  app.get(`${apiPrefix}/config`, (req, res) => {
    console.log(config);
    res.json({
      apiBaseUrl: config.apiBaseUrl,
    });
  });

  // db health
  app.get(`${apiPrefix}/health/db`, (req, res) => {
    const result = db.prepare("SELECT 1 as ok").get();

    res.json({
      database: "ok",
      result: result.ok,
    });
  });

  registerUserRoutes({ app, repository: repositories.users });
}

// start server
function startup() {
  const app = express();

  // set middlewares
  app.use(express.json());

  // server /public static files -- GET / -> serves /public/index.html auto
  app.use(express.static("public"));

  // connect to sqlite
  const db = createDatabase();

  // init db models
  initializeDatabase(db);

  // create a http server -- (for future sockets)
  const server = http.createServer(app);

  // register repositories
  const repositories = {
    users: new UserRepository(db),
  };

  // register routes
  registerRoutes(app, db, repositories);

  // run http server
  server.listen(config.port, () => {
    console.log(`server running at http://localhost:${config.port}`);
  });

  // handle server error
  server.on("error", (error) => {
    console.error("server error: ", error);
    process.exit(1); // return 1 on -- runtime server failure
  });

  return { app, server, db };
}

const { app, server, db } = startup();

// shutdown
function shutdown() {
  console.log("shutting down...");

  // close http server
  server.close(() => {
    console.log("server closed.");

    db.close();
    console.log("sqlite db closed");

    process.exit(0); // return 0 on -- server close
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
