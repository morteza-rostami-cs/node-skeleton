import { get, post, put, del } from "./api.js";

export function getUsers() {
  return get("/users");
}

export function getUser(id) {
  return get(`/users/${id}`);
}

export function createUser(data) {
  return post(`/users`, data);
}

export function editUser(id, data) {
  return put(`/users/${id}`, data);
}

export function deleteUser(id) {
  return del(`/users/${id}`);
}
