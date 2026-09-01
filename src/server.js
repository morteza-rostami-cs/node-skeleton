import express from "express";
import http from "node:http"; // node native http module

import config from "./config.js";

const apiPrefix = config.apiPrefix;

function registerRoutes(app) {
  // api routes -- any other route -- can be frontend
  app.get(`${apiPrefix}/health`, (req, res) => {
    res.json({ status: "ok", nodeEnv: config.nodeEnv });
  });
}

// start server
function startup() {
  const app = express();

  // set middlewares
  app.use(express.json());

  // server /public static files -- GET / -> serves /public/index.html auto
  app.use(express.static("public"));

  // create a http server -- (for future sockets)
  const server = http.createServer(app);

  // register routes
  registerRoutes(app);

  // run http server
  server.listen(config.port, () => {
    console.log(`server running at http://localhost:${config.port}`);
  });

  // handle server error
  server.on("error", (error) => {
    console.error("server error: ", error);
    process.exit(1); // return 1 on -- runtime server failure
  });

  return { app, server };
}

const { app, server } = startup();

// shutdown
function shutdown() {
  console.log("shutting down...");

  // close http server
  server.close(() => {
    console.log("server closed.");
    process.exit(0); // return 0 on -- server close
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
