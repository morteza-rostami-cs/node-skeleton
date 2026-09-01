/*
GET     /api/users
GET     /api/users/:id
POST    /api/users
PUT     /api/users/:id
DELETE  /api/users/:id
*/

import config from "../config.js";

const apiPrefix = config.apiPrefix;

const users = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
  },
];

function registerUserRoutes({ app, repository }) {
  function gets(req, res) {
    const id = Number(req.params.id); // url params

    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    res.json(user);
  }

  function get(req, res) {
    return res.json(users);
  }

  function create(req, res) {
    const user = {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
    };

    res.status(201).json(user);
  }

  function edit(req, res) {
    const id = Number(req.params.id);

    const user = {
      id,
      name: "Updated User",
      email: "updated@example.com",
    };

    res.json(user);
  }

  function del(req, res) {
    res.status(204).send();
  }

  // GET /users/:id
  app.get(`${apiPrefix}/users/:id`, gets);

  // GET /users
  app.get(`${apiPrefix}/users`, get);

  // POST /users
  app.post(`${apiPrefix}/users`, create);

  // PUT /users/:id
  app.put(`${apiPrefix}/users/:id`, edit);

  // DELETE /api/users/:id
  app.delete(`${apiPrefix}/users/:id`, del);
}

export default registerUserRoutes;
