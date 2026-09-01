import express from "express";
import http from "node:http"; // node native http module

import config from "./config.js";

// express app
const app = express();

// routes
app.get("/", (req, res) => {
  res.send("hi, starter app");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", nodeEnv: config.nodeEnv });
});

// create a http server -- (for future sockets)
const server = http.createServer(app);

// start server
function startup() {
  server.listen(config.port, () => {
    console.log(`server running at http://localhost:${config.port}`);
  });
}

startup();

// handle server error
server.on("error", (error) => {
  console.error("server error: ", error);
  process.exit(1); // return 1 on -- runtime server failure
});

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
