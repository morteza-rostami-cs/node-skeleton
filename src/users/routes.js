/*
GET     /api/users
GET     /api/users/:id
POST    /api/users
PUT     /api/users/:id
DELETE  /api/users/:id
*/

import config from "../config.js";

const apiPrefix = config.apiPrefix;

function registerUserRoutes({ app, repository }) {
  function gets(req, res) {
    const users = repository.findAll();

    res.status(200).json(users);
  }

  function get(req, res) {
    const id = Number(req.params.id); // url params

    const user = repository.findById(id);

    if (!user) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    res.json(user);
  }

  function create(req, res) {
    let data = req.body;

    data = {
      email: data.email,
      username: data.username,
      hashedPassword: data.password,
      session: "session",
    };

    console.log("body: ", req.body);

    const user = repository.create(data);

    res.status(201).json(user);
  }

  function edit(req, res) {
    const id = Number(req.params.id);

    const existing = repository.findById(id);

    if (!existing) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    let data = req.body;

    data = {
      email: data.email,
      username: data.username,
      hashedPassword: data.password,
      session: "session",
    };

    // update user
    const user = repository.edit(id, data);

    res.json(user);
  }

  function del(req, res) {
    const id = Number(req.params.id);

    const deleted = repository.delete(id);

    if (!deleted) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(204).send();
  }

  // GET /users/:id
  app.get(`${apiPrefix}/users/:id`, get);

  // GET /users
  app.get(`${apiPrefix}/users`, gets);

  // POST /users
  app.post(`${apiPrefix}/users`, create);

  // PUT /users/:id
  app.put(`${apiPrefix}/users/:id`, edit);

  // DELETE /api/users/:id
  app.delete(`${apiPrefix}/users/:id`, del);
}

export default registerUserRoutes;
