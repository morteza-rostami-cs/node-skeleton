export default class User {
  constructor({
    id = null,
    email,
    username,
    hashedPassword = null,
    session = null,
  }) {
    this.id = id;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.session = session;
  }
}
