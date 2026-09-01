export default class UserRepository {
  constructor(db) {
    this.db = db;
  }

  findAll() {
    const results = this.db
      .prepare(
        `
         select id, email, username, hashed_password, session
         from users
      `,
      )
      .all();

    return results;
  }

  findById(id) {
    return this.db
      .prepare(
        `
         select id, email, username, hashed_password, session
         from users
         where id = ?
      `,
      )
      .get(id);
  }

  create({ email, username, hashedPassword, session = null }) {
    console.log(email, username, hashedPassword, session);
    const result = this.db
      .prepare(
        `
         insert into users (
            email,
            username,
            hashed_password,
            session
         )
         values (?, ?, ?, ?)
      `,
      )
      .run(email, username, hashedPassword, session);

    // return created record id
    return this.findById(result.lastInsertRowid);
  }

  edit(id, { email, username, hashedPassword, session }) {
    this.db
      .prepare(
        `
         update users
         set
            email = ?,
            username = ?,
            hashed_password = ?,
            session = ?
         where id = ?
      `,
      )
      .run(email, username, hashedPassword, session, id);

    return this.findById(id);
  }

  delete(id) {
    const result = this.db
      .prepare(
        `
         delete from users
         where id = ?
      `,
      )
      .run(id);

    // return true if item was deleted
    return result.changes > 0;
  }
}
